import { encode } from 'mb-warband-parser';
import { Server, Player } from '../../models';
import { LOAD_FAIL_KICK, LOAD_GEAR } from '../actions';
import PromiseStore from '../../utils/promise-store';

export default async function(ctx) {
  try {
    if (PromiseStore[`load-player-${ctx.query.guid}`])
      await PromiseStore[`load-player-${ctx.query.guid}`];
  } catch (err) {
    ctx.body = encode([LOAD_FAIL_KICK, ctx.query.playerID]);
    return;
  }

  const server = await Server.findOne({
    id: ctx.query.serverID
  });

  const player = await Player.findOne({
    server: ctx.query.serverID,
    guid: ctx.query.guid
  });

  ctx.body = encode([
    LOAD_GEAR,
    ctx.query.playerID,
    player.pouchGold,
    player.bankGold,
    player.health || -1,
    player.food || -1,
    player.poison || -1,
    player.headArmour || -1,
    player.bodyArmour || -1,
    player.footArmour || -1,
    player.handArmour || -1,
    player.firstItem || -1,
    player.secondItem || -1,
    player.thirdItem || -1,
    player.forthItem || -1,
    player.firstAmmo || -1,
    player.secondAmmo || -1,
    player.thirdAmmo || -1,
    player.forthAmmo || -1,
    player.horseHealth || -1,
    player.xPosition || -1,
    player.yPosition || -1,
    player.zPosition || -1,
    player.linkedSteamUser ? '*****' : player.pin,
    server.welcomeMessage
  ]);
}
