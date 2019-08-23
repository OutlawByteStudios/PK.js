import { reinstallServer } from '../../../../utils/server-folder-manager';

import { SteamUser, Server } from '../../../../models';
import gameserverStatusCache from '../../../../utils/gameserver-status-cache';

export default async (parent, args, context) => {
  /* Check for Permissions */
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const requestingUser = await SteamUser.findOne({
    steamID: context.user,
    panelAdmin: true
  });

  if (requestingUser === null)
    throw new Error('You do not have permission to do that.');

  /* Get copy of server */
  const server = await Server.findOne({
    id: args.serverID
  });

  if (server === null) throw new Error('Server not found.');

  if (await gameserverStatusCache.gameserverOnline(server.id))
    throw new Error('You cannot reinstall a server while it is running!');

  await reinstallServer(server);

  return server;
};
