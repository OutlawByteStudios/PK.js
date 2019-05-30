import { encode } from 'mb-warband-parser';
import { PlayerName, Player } from '../../models';
import {
  LOAD_PLAYER,
  LOAD_PLAYER_ALREADY_CONNECTED,
  LOAD_PLAYER_NAME_TAKEN
} from '../actions';

export default async function(ctx) {
  const server = ctx.query.server;
  const playerID = ctx.query.playerID;
  const guid = ctx.query.guid;
  const name = ctx.query.name;
  // const admin = ctx.query.admin;

  // Check name isn't already in use.
  const playerName = await PlayerName.findOne({
    server,
    name,
    player: { $ne: guid }
  });

  if (playerName) {
    ctx.body = encode([LOAD_PLAYER_NAME_TAKEN, playerID]);
    return;
  } else {
    await PlayerName.findOneAndUpdate(
      { server, player: guid, name },
      { server, player: guid, name },
      { upsert: true, setDefaultsOnInsert: true }
    );
  }

  const player = await Player.findOneAndUpdate(
    { server, guid },
    { server, guid, $inc: { online: 1 } },
    {
      upsert: true,
      setDefaultsOnInsert: true,
      new: true
    }
  );

  // If player-selector is already connected to prevent duping
  if (player.online > 1) {
    ctx.body = encode([LOAD_PLAYER_ALREADY_CONNECTED, playerID]);
    return;
  }

  ctx.body = encode([
    LOAD_PLAYER,
    playerID,
    player.factionID || -1,
    player.classID || -1,
    player.horse || -1
  ]);
}
