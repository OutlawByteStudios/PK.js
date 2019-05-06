import { encode } from 'mb-warband-parser';
import { Player } from '../../models';
import { BANK_WITHDRAW } from '../actions';

export default async function(ctx) {
  const player = await Player.findOne({
    server: ctx.query.server,
    guid: ctx.query.guid
  });

  let amount = Math.min(player.bankGold, ctx.query.amount);

  player.bankGold = player.bankGold - amount;
  await player.save();

  ctx.body = encode([
    BANK_WITHDRAW,
    ctx.query.playerID,
    amount,
    player.bankGold
  ]);
}
