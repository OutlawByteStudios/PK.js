import { encode } from 'mb-warband-parser';

import { Player } from '../../models/index';

import { PING } from '../actions';

export default async function(ctx) {
  await Player.updateMany({ server: ctx.query.serverID }, { online: 0 });
  ctx.body = encode([PING]);
}
