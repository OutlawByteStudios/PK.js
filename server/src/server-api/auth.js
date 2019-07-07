import { encode } from 'mb-warband-parser';

import { Server } from '../models';
import { ACCESS_DENIED } from './actions';

export default async (ctx, next) => {
  const servers = await Server.find({
    id: ctx.query.serverID,
    apiKey: ctx.query.apiKey
  });

  if (servers.length) {
    await next();
  } else {
    ctx.throw(403, encode([ACCESS_DENIED, 'Forbidden']));
  }
};
