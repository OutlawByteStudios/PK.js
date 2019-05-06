import { encode } from 'mb-warband-parser';
import { Player, PlayerName } from '../../models';
import { SAVE_PLAYER_AND_GEAR } from '../actions';

export default async function(ctx) {
  const server = ctx.query.server;
  const guid = ctx.query.guid;
  const name = ctx.query.name;

  let update = {
    server,
    guid,
    $inc: { online: -1 },
    lastSeen: new Date(),
    factionID: ctx.query.factionID,
    classID: ctx.query.classID
  };

  if (ctx.query.alive !== undefined) {
    update = {
      ...update,
      pouchGold: ctx.query.pouchGold,
      health: ctx.query.health,
      food: ctx.query.food,
      poison: ctx.query.poison,
      headArmour: ctx.query.headArmour,
      bodyArmour: ctx.query.bodyArmour,
      footArmour: ctx.query.footArmour,
      handArmour: ctx.query.handArmour,
      firstItem: ctx.query.firstItem,
      secondItem: ctx.query.secondItem,
      thirdItem: ctx.query.thirdItem,
      forthItem: ctx.query.forthItem,
      firstAmmo: ctx.query.firstAmmo,
      secondAmmo: ctx.query.secondAmmo,
      thirdAmmo: ctx.query.thirdAmmo,
      forthAmmo: ctx.query.forthAmmo,
      horse: ctx.query.horse,
      horseHealth: ctx.query.horseHealth,
      xPosition: ctx.query.xPosition,
      yPosition: ctx.query.yPosition,
      zPosition: ctx.query.zPosition
    };
  }

  await Player.findOneAndUpdate({ server, guid }, update, {
    upsert: true,
    setDefaultsOnInsert: true
  });

  await PlayerName.findOneAndUpdate(
    { server, name },
    { server, name, lastSeen: new Date() },
    {
      upsert: true,
      setDefaultsOnInsert: true
    }
  );

  ctx.body = encode([SAVE_PLAYER_AND_GEAR]);
}
