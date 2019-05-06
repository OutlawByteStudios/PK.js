import { encode } from 'mb-warband-parser';
import { Server, Player } from '../../models';
import { LOAD_GEAR } from '../actions';

export default async function(ctx) {
  const server = await Server.findOne({ _id: ctx.query.server });
  const player = await Player.findOne({
    server: ctx.query.server,
    guid: ctx.query.guid
  });

  ctx.body = encode([
    LOAD_GEAR,
    ctx.query.playerID,
    player.pouchGold,
    player.bankGold,
    player.health,
    player.food,
    player.poison,
    player.headArmour,
    player.bodyArmour,
    player.footArmour,
    player.handArmour,
    player.firstItem,
    player.secondItem,
    player.thirdItem,
    player.forthItem,
    player.firstAmmo,
    player.secondAmmo,
    player.thirdAmmo,
    player.forthAmmo,
    player.horseHealth,
    player.xPosition,
    player.yPosition,
    player.zPosition,
    server.welcomeMessage
  ]);
}
