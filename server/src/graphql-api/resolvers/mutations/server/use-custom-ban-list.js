import { AdminPermission, Server } from '../../../../models';

import {
  parseConfig,
  buildConfig
} from '../../../../utils/server-config-parser';
import path from 'path';
import fs from 'fs';

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

  const server = await Server.findOneAndUpdate(
    {
      id: args.serverID
    },
    {
      useCustomBanList: args.on
    },
    {
      new: true
    }
  );

  const currentGameserverPath = path.join(
    require.resolve('gameservers'),
    `../${args.serverID}`
  );
  if (!fs.existsSync(currentGameserverPath))
    throw new Error('Server folder does not exist!');

  const configFolderPath = path.join(currentGameserverPath, '/Configs');
  if (!fs.existsSync(configFolderPath))
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

  return server;
};
