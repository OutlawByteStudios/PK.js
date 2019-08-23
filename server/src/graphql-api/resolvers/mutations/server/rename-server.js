import fs from 'fs';
import path from 'path';
import { UserInputError } from 'apollo-server-koa';

import { AdminPermission, Server } from '../../../../models';
import { validatorServerName } from 'shared/validators';
import gameserverStatusCache from '../../../../utils/gameserver-status-cache';

import {
  parseConfig,
  buildConfig
} from '../../../../utils/server-config-parser';

export default async (parent, args, context) => {
  /* Check for Permissions */
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const requestingAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: context.user,
    renameServer: { $gt: 0 }
  });

  if (requestingAdmin === null)
    throw new Error('You do not have permission to do that.');

  const server = await Server.findOne({
    id: args.serverID
  });

  if (server === null) throw new Error('Server not found.');

  /* Create Server Document in DB */
  if (!validatorServerName(args.name))
    throw new UserInputError('Invalid Server Name.');

  if (await gameserverStatusCache.gameserverOnline(args.serverID))
    throw new Error('Server must be offline to be renamed.');

  server.name = args.name;

  const currentGameserverPath = path.join(
    require.resolve('gameservers'),
    `../${args.serverID}`
  );
  if (!fs.existsSync(currentGameserverPath))
    throw new Error('Server folder does not exist!');

  const configFolderPath = path.join(currentGameserverPath, '/Configs');
  if (!fs.existsSync(currentGameserverPath))
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

  await server.save();
  return server;
};
