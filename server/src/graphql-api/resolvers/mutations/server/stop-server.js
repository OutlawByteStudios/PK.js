import { AdminPermission, Server } from '../../../../models';
import serverConfig from '../../../../../server-config';
import { execSync } from 'child_process';

export default async (parent, args, context) => {
  /* Check for Permissions */
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const requestingAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: context.user
  });

  if (requestingAdmin === null)
    throw new Error('You do not have permission to do that.');

  const server = await Server.findOne({
    id: args.serverID
  });
  if (server === null) throw new Error('Server not found.');

  if (!serverConfig.gameserverDevDryRun) {
    execSync(`screen -m -d -S serverscreen${server.id} -X quit`);
  } else {
    console.log(
      `Gameserver Dry Run Exec: screen -m -d -S serverscreen${server.id} -X quit`
    );
  }

  server.gameserverOnline = false;

  return server;
};
