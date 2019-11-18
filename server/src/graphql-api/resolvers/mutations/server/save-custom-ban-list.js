import fs from 'fs';
import path from 'path';

import { AdminPermission, Server } from '../../../../models';

export default async (parent, args, context) => {
  /* Check for Permissions */
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const requestingAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: context.user,
    editCustomBanList: { $gt: 0 }
  });

  if (requestingAdmin === null)
    throw new Error('You do not have permission to do that.');

  const server = await Server.findOne({
    id: args.serverID
  });
  if (server === null) throw new Error('Server not found.');

  const currentGameserverPath = path.join(
    require.resolve('gameservers'),
    `../${server.id}`
  );
  if (!fs.existsSync(currentGameserverPath))
    throw new Error('Server folder does not exist!');

  const customBanListFile = path.join(
    currentGameserverPath,
    '/custom_bans.txt'
  );
  if (!fs.existsSync(customBanListFile))
    throw new Error('Custom ban list file does not exist!');

  await fs.promises.writeFile(customBanListFile, args.customBanList, 'utf8');

  return server;
};
