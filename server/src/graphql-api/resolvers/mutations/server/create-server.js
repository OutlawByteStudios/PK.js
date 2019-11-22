import { UserInputError } from 'apollo-server-koa';

import { Server, AdminPermission, SteamUser } from '../../../../models';
import { installServer } from '../../../../utils/server-folder-manager';

import jobContainer from '../../../../jobs';

import { validatorServerName } from 'shared/validators';
import { panelPermissions, gamePermissions } from 'shared/constants';

import {
  isServerOnline,
  restartServer
} from '../../../../utils/gameserver-instance-tools';

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

  /* Create Server Document in DB */
  if (!validatorServerName(args.name))
    throw new UserInputError('Invalid Server Name.');

  let serverInput = { name: args.name };

  if (args.welcomeMessage) serverInput.welcomeMessage = args.welcomeMessage;
  if (args.defaultBankGold) serverInput.defaultBankGold = args.defaultBankGold;
  if (args.defaultPouchGold)
    serverInput.defaultPouchGold = args.defaultPouchGold;
  if (args.defaultBankLimit)
    serverInput.defaultBankLimit = args.defaultBankLimit;

  if (args.recordStats) serverInput.recordStats = args.recordStats;

  if (args.gameserverRestartCron)
    serverInput.gameserverRestartCron = args.gameserverRestartCron;

  let server = await Server.create([serverInput], {
    setDefaultsOnInsert: true
  });

  server = server[0];

  /* Create AdminPermisisons Document in DB */
  let adminPermission = { server: server.id };

  for (let permission of panelPermissions.concat(gamePermissions)) {
    adminPermission[permission.permission] = 2;
  }

  const panelAdmins = await SteamUser.find({ panelAdmin: true });
  for(let panelAdmin of panelAdmins){
    adminPermission.admin = panelAdmin.steamID;
    await AdminPermission.create(adminPermission);
  }

  await installServer(server);

  jobContainer.addJob(
    `restart-server-${server.id}`,
    server.gameserverRestartCron,
    async () => {
      console.log(
        `Checking if restarted need for instance for server: ${server.id}`
      );
      if (await isServerOnline(server.id)) {
        console.log(`Restarting server instance for server: ${server.id}`);
        await restartServer(server.id);
      }
    }
  );

  return server;
};
