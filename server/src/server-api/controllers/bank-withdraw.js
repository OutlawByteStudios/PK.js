import { encode } from 'mb-warband-parser';
import { Player } from '../../models';
import { BANK_WITHDRAW } from '../actions';
import bankLock from "../../utils/bank-lock";

export default async function(ctx) {
  // return no / bogus response if bank is locked.
  if(bankLock.isLocked(ctx.query.guid)) ctx.body = encode([-1]);
  bankLock.lock(ctx.query.guid);

  // get player value to check increment value with
  const player = await Player.findOne({
    server: ctx.query.serverID,
    guid: ctx.query.guid
  });

  // find amount to increment player bank by
  let amount = Math.min(player.bankGold, ctx.query.amount);

  player.bankGold = player.bankGold - amount;

  await player.save();

  // return info to player
  ctx.body = encode([
    BANK_WITHDRAW,
    ctx.query.playerID,
    amount,
    player.bankGold
  ]);

  bankLock.unlock(ctx.query.guid);
}
