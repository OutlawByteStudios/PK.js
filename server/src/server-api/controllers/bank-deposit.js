import { encode } from 'mb-warband-parser';
import { Player } from '../../models';
import { BANK_DEPOSIT } from '../actions';

export default async function(ctx) {
  const player = await Player.findOne({
    server: ctx.query.server,
    guid: ctx.query.guid
  });

  let amount = ctx.query.amount;
  let amountToDeposit = Math.min(
    player.bankGold >= player.bankLimit
      ? 0
      : player.bankLimit - player.bankGold,
    ctx.query.amount
  );

  player.bankGold = player.bankGold + amountToDeposit;
  await player.save();

  ctx.body = encode([
    BANK_DEPOSIT,
    ctx.query.playerID,
    amountToDeposit,
    player.bankGold,
    amount - amountToDeposit, // amount go give back to player-selector
    'Bank limit reached.' // reason  for above
  ]);
}
