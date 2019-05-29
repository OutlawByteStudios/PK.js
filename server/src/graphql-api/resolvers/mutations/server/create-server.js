import fs from 'fs';
import path from 'path';
import { UserInputError } from 'apollo-server-koa';
import cprp from 'cpr-promise';

import { Server, AdminPermission, SteamUser } from '../../../../models';

import { validatorServerName } from 'shared/validators';
import { panelPermissions, gamePermissions } from 'shared/constants';

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
  if (validatorServerName(args.name))
    throw new UserInputError('Invalid Server Name.');

  let serverInput = { name: args.name };

  if (args.welcomeMessage) serverInput.welcomeMessage = args.welcomeMessage;

  let server = await Server.create([serverInput], {
    setDefaultsOnInsert: true
  });

  server = server[0];

  /* Create AdminPermisisons Document in DB */
  let adminPermission = { server: server.id, admin: context.user };

  for (let permission of panelPermissions.concat(gamePermissions)) {
    adminPermission[permission.permission] = 2;
  }

  await AdminPermission.create(adminPermission);

  /* Create Server in Gameservers folder */
  const gameserverPath = path.join(require.resolve('gameservers'), '../');

  await cprp(
    path.join(gameserverPath, '/default'),
    path.join(gameserverPath, `/${server.id}`),
    {
      overwrite: true,
      confirm: true,
      filter: filePath => path.basename(filePath) !== '.gitkeep'
    }
  );

  const newGameserverPath = path.join(gameserverPath, `/${server.id}`);

  /* Configure Quick Strings in PK module */
  const pkPath = path.join(newGameserverPath, '/Modules/Persistent Kingdoms');
  if (!fs.existsSync(pkPath)) return server;

  let file = await fs.promises.readFile(
    path.join(pkPath, '/quick_strings.txt'),
    'utf8'
  );
  file = file.replace(/SERVER_ID/g, server.id);
  file = file.replace(/SERVER_API_KEY/g, server.apiKey);
  await fs.promises.writeFile(
    path.join(pkPath, '/quick_strings.txt'),
    file,
    'utf8'
  );

  return server;
};
