import { encode } from 'mb-warband-parser';
import { Player } from '../../models';
import { BANK_DEPOSIT } from '../actions';

import bankLock from '../../utils/bank-lock';

export default async function(ctx) {
  // return no / bogus response if bank is locked.
  if (bankLock.isLocked(ctx.query.guid)) ctx.body = encode([-1]);
  bankLock.lock(ctx.query.guid);

  // get player value to check increment value with
  const player = await Player.findOne({
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

  player.bankGold = player.bankGold + amountToDeposit;

  await player.save();

  // return info to player
  ctx.body = encode([
    BANK_DEPOSIT,
    ctx.query.playerID,
    amountToDeposit,
    player.bankGold,
    amount - amountToDeposit, // amount go give back to player-selector
    'Bank limit reached.' // reason for above
  ]);

  bankLock.unlock(ctx.query.guid);
}
