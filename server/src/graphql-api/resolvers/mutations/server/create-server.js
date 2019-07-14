import fs from 'fs';
import path from 'path';
import { UserInputError } from 'apollo-server-koa';
import cprp from 'cpr-promise';

import { Server, AdminPermission, SteamUser } from '../../../../models';

import { validatorServerName } from 'shared/validators';
import { panelPermissions, gamePermissions } from 'shared/constants';
import {
  buildConfig,
  parseConfig
} from '../../../../utils/server-config-parser';

import serverConfig from '../../../../../server-config';

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

  /* Update Server Name in Config Files */
  const configFolderPath = path.join(newGameserverPath, '/Configs');
  if (!fs.existsSync(newGameserverPath))
    throw new Error('Configs folder does not exist!');

  let files = fs.readdirSync(configFolderPath, {
    withFileTypes: true
  });

  files = files
    .filter(file => file.isFile())
    .map(file => ({ name: file.name }));

  files.forEach(file => {
    let configPath = path.join(configFolderPath, file.name);
    let config = fs.readFileSync(configPath, 'utf8');
    config = buildConfig(server, parseConfig(config));
    fs.writeFileSync(configPath, config, 'utf8');
  });

  /* Configure Quick Strings in PK module */
  const pkPath = path.join(newGameserverPath, '/Modules/Persistent Kingdoms');
  if (!fs.existsSync(pkPath)) return server;

  let input = fs
    .readFileSync(path.join(pkPath, '/quick_strings.txt'), 'utf8')
    .split('\n');
  let output = [];
  for (let line of input) {
    let split = line.split(' ');
    if (split.length === 2) {
      split[1] = split[1]
        .replace(/SERVER_ADDRESS/g, serverConfig.gameserverAPIAddress)
        .replace(/SERVER_ID/g, server.id)
        .replace(/SERVER_API_KEY/g, server.apiKey);
    }
    output.push(split.join(' '));
  }
  await fs.writeFileSync(
    path.join(pkPath, '/quick_strings.txt'),
    output.join('\n'),
    'utf8'
  );

  return server;
};
