import { AdminPermission, Server } from '../../../../models';

import { restartServer } from '../../../../utils/gameserver-instance-tools';
import AdminLog from '../../../../models/admin-log';

export default async (parent, args, context) => {
  /* Check for Permissions */
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const requestingAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: context.user,
    manageServerInstance: { $gt: 0 }
  });

  if (requestingAdmin === null)
    throw new Error('You do not have permission to do that.');

  const server = await Server.findOne({
    id: args.serverID
  });
  if (server === null) throw new Error('Server not found.');

  await restartServer(
    server.id,
    server.gameserverLastModule,
    server.gameserverLastConfig
  );

  await new AdminLog({
    server: server.id,
    admin: requestingAdmin.admin,

    type: 'restart_server'
  }).save();

  return server;
};
