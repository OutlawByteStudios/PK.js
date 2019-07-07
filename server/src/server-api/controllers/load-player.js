import { encode } from 'mb-warband-parser';
import {
  IPMask,
  IPTracker,
  PlayerName,
  Server,
  Player,
  AdminPermission
} from '../../models';
import PromiseStore from '../../utils/promise-store';

import {
  LOAD_PLAYER_ALREADY_CONNECTED,
  LOAD_PLAYER_NAME_TAKEN,
  LOAD_PLAYER,
  LOAD_ADMIN,
  LOAD_FAIL_KICK
} from '../actions';

const recordIP = async (ip, guid) => {
  // oddly the autoincrement package doesn't seem to work on findOneAndUpdate
  // so we're going to use create instead. Probably should revisit this at some
  // point and possibly make an issue / PR on the package repo
  let ipMask = await IPMask.findOne({ ip });

  if (ipMask === null) {
    ipMask = await IPMask.create([{ ip }], { setDefaultsOnInsert: true });
    ipMask = ipMask[0];
  }

  await IPTracker.update(
    {
      ipMask: ipMask.id,
      player: guid
    },
    {
      ipMask: ipMask.id,
      player: guid,
      lastSeen: Date.now()
    },
    {
      upsert: true
    }
  );
};

export default async ctx => {
  /* Record IP details in background as we want to know who is
   using what GUID regardless of whether they can connect. */
  recordIP(ctx.query.ip, ctx.query.guid);

  // start now promise to load player, store this in the promise store
  // so we can wait for it to resolve in load gear
  PromiseStore[`load-player-${ctx.query.guid}`] = new Promise(async resolve => {
    /* Check Player Name is not already in use */
    const playerName = await PlayerName.findOne({
      server: ctx.query.serverID,
      name: ctx.query.name,
      player: { $ne: ctx.query.guid }
    });

    // kick player if name is in use
    if (playerName) {
      return resolve(encode([LOAD_PLAYER_NAME_TAKEN, ctx.query.playerID]));
    }

    // insert new player name / update last seen
    await PlayerName.updateOne(
      {
        server: ctx.query.serverID,
        name: ctx.query.name,
        player: ctx.query.guid
      },
      {
        server: ctx.query.serverID,
        name: ctx.query.name,
        player: ctx.query.guid,
        lastSeen: Date.now()
      },
      {
        upsert: true
      }
    );

    if (ctx.query.admin !== '') {
      /* Find player */
      // find server for use in following steps
      const server = await Server.findOne({ id: ctx.query.serverID });

      // attempt to find existing player
      let player = await Player.findOne({
        server: ctx.query.serverID,
        guid: ctx.query.guid
      });

      // if no existing player, create one.
      if (player === null) {
        player = new Player({
          server: ctx.query.serverID,
          guid: ctx.query.guid,
          bankGold: server.defaultBankGold,
          pouchGold: server.defaultPouchGold,
          bankLimit: server.defaultBankLimit
        });
      }

      // increase the player online count by one
      player.online += 1;
      await player.save();

      // if player is already connected kick them to prevent duping
      if (player.online > 1) {
        return resolve(
          encode([LOAD_PLAYER_ALREADY_CONNECTED, ctx.query.playerID])
        );
      }

      // return player information
      return resolve(
        encode([
          LOAD_PLAYER,
          ctx.query.playerID,
          player.factionID || -1,
          player.classID || -1,
          player.horse || -1
        ])
      );
    } else {
      const adminPermissions = await AdminPermission.findOne({
        player: ctx.query.guid
      });

      if (adminPermissions === null)
        return resolve(encode([LOAD_FAIL_KICK, ctx.query.playerID]));

      // need to flip admin permissions as they're the opposite in game, whoops

      resolve(
        encode([
          LOAD_ADMIN,
          ctx.query.playerID,
          adminPermissions.adminSpectate > 0 ? 0 : 1,
          adminPermissions.adminTools > 0 ? 0 : 1,
          adminPermissions.adminPanel > 0 ? 0 : 1,
          adminPermissions.adminGold > 0 ? 0 : 1,
          adminPermissions.adminKick > 0 ? 0 : 1,
          adminPermissions.adminTemporaryBan > 0 ? 0 : 1,
          adminPermissions.adminPermanentBan > 0 ? 0 : 1,
          adminPermissions.adminKillFade > 0 ? 0 : 1,
          adminPermissions.adminFreeze > 0 ? 0 : 1,
          adminPermissions.adminTeleport > 0 ? 0 : 1,
          adminPermissions.adminItems > 0 ? 0 : 1,
          adminPermissions.adminHealSelf > 0 ? 0 : 1,
          adminPermissions.adminGodlike > 0 ? 0 : 1,
          adminPermissions.adminShips > 0 ? 0 : 1,
          adminPermissions.adminAnnouncements > 0 ? 0 : 1,
          adminPermissions.adminPolls > 0 ? 0 : 1,
          adminPermissions.adminAllItems > 0 ? 0 : 1,
          adminPermissions.adminMute > 0 ? 0 : 1,
          adminPermissions.adminAnimal > 0 ? 0 : 1,
          adminPermissions.adminJoinFactions > 0 ? 0 : 1,
          adminPermissions.adminFactions > 0 ? 0 : 1
        ])
      );
    }
  });

  try {
    ctx.body = await PromiseStore[`load-player-${ctx.query.guid}`];
  } catch (err) {
    ctx.body = encode([LOAD_FAIL_KICK, ctx.query.playerID]);
  }
  delete PromiseStore[`load-player-${ctx.query.guid}`];
};
