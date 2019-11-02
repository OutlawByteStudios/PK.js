import { encode } from 'mb-warband-parser';
import { Player } from '../../models';
import { BANK_WITHDRAW } from '../actions';

export default async function(ctx) {
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
}
