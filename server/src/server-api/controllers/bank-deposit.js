import { encode } from 'mb-warband-parser';
import { Player } from '../../models';
import { BANK_DEPOSIT } from '../actions';

export default async function(ctx) {
  let player;

  // get player value to check increment value with
  player = await Player.findOne({
    server: ctx.query.serverID,
    guid: ctx.query.guid
  });

  // find amount to increment player bank by
  let amount = ctx.query.amount;
  let amountToDeposit = Math.min(
    player.bankGold >= player.bankLimit
      ? 0
      : player.bankLimit - player.bankGold,
    ctx.query.amount
  );

  // use update query rather than .save() to ensure we increment the freshest value
  // get new data to return to player below
  player = await Player.findOneAndUpdate(
    {
      server: player.server,
      guid: player.guid
    },
    {
      $inc: { bankGold: amountToDeposit }
    },
    {
      new: true
    }
  );

  // return info to player
  ctx.body = encode([
    BANK_DEPOSIT,
    ctx.query.playerID,
    amountToDeposit,
    player.bankGold,
    amount - amountToDeposit, // amount go give back to player-selector
    'Bank limit reached.' // reason for above
  ]);
}
