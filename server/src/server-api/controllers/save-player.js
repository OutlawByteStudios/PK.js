import { encode } from 'mb-warband-parser';
import { Player, PlayerName } from '../../models';
import { SAVE_PLAYER_AND_GEAR } from '../actions';

export default async function(ctx) {
  let update = {
    $inc: { online: -1 },
    lastSeen: Date.now(),
    factionID: ctx.query.factionID,
    classID: ctx.query.classID
  };

  if (ctx.query.alive !== undefined) {
    update.health = ctx.query.health;
    update.food = ctx.query.food;
    update.poison = ctx.query.poison;
    update.headArmour = ctx.query.headArmour;
    update.bodyArmour = ctx.query.bodyArmour;
    update.footArmour = ctx.query.footArmour;
    update.handArmour = ctx.query.handArmour;
    update.firstItem = ctx.query.firstItem;
    update.secondItem = ctx.query.secondItem;
    update.thirdItem = ctx.query.thirdItem;
    update.forthItem = ctx.query.forthItem;
    update.firstAmmo = ctx.query.firstAmmo;
    update.secondAmmo = ctx.query.secondAmmo;
    update.thirdAmmo = ctx.query.thirdAmmo;
    update.forthAmmo = ctx.query.forthAmmo;
    update.horse = ctx.query.horse;
    update.horseHealth = ctx.query.horseHealth;
    update.xPosition = ctx.query.xPosition;
    update.yPosition = ctx.query.yPosition;
    update.zPosition = ctx.query.zPosition;
    update.pouchGold = ctx.query.pouchGold;
  }

  await Player.updateOne(
    { server: ctx.query.serverID, guid: ctx.query.guid },
    update
  );

  await PlayerName.updateOne(
    { server: ctx.query.serverID, name: ctx.query.name },
    { lastSeen: Date.now() }
  );

  ctx.body = encode([SAVE_PLAYER_AND_GEAR]);
}
