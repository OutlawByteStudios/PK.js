import { encode } from 'mb-warband-parser';
import { Player } from '../../models';
import { BANK_WITHDRAW } from '../actions';

export default async function(ctx) {
  let player;

  // get player value to check increment value with
  player = await Player.findOne({
    server: ctx.query.serverID,
    guid: ctx.query.guid
  });

  // find amount to increment player bank by
  let amount = Math.min(player.bankGold, ctx.query.amount);

  // use update query rather than .save() to ensure we increment the freshest value
  // get new data to return to player below
  player = await Player.findOneAndUpdate(
    {
      server: player.server,
      guid: player.guid
    },
    {
      $inc: { bankGold: amount * -1 }
    },
    {
      new: true
    }
  );

  // return info to player
  ctx.body = encode([
    BANK_WITHDRAW,
    ctx.query.playerID,
    amount,
    player.bankGold
  ]);
}
