import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { AdminPermission, Server } from '../../../../models';

import serverConfig from '../../../../../server-config';

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

  const currentGameserverPath = path.join(
    require.resolve('gameservers'),
    `../${server.id}`
  );
  if (!fs.existsSync(currentGameserverPath))
    throw new Error('Server folder does not exist!');

  const executablePath = path.join(
    currentGameserverPath,
    args.disableWSE === true
      ? '/mb_warband_dedicated.exe'
      : '/WSELoaderServer.exe'
  );
  if (!fs.existsSync(executablePath))
    throw new Error('Executable does not exist!');

  const moduleFolder = path.join(
    currentGameserverPath,
    `/Modules/${args.module}`
  );
  if (!fs.existsSync(moduleFolder)) throw new Error('Module does not exist!');

  let configFile = path.join(currentGameserverPath, `/Configs/${args.config}`);
  if (!fs.existsSync(configFile)) throw new Error('Config does not exist!');

  if (!serverConfig.gameserverDevDryRun) {
    execSync(
      `screen -m -d -S serverscreen${server.id} wine ${
        args.disableWSE === true
          ? 'mb_warband_dedicated.exe'
          : 'WSELoaderServer.exe'
      } -r "Configs/${args.config}" -m "${args.module}"`,
      {
        cwd: currentGameserverPath
      }
    );
  } else {
    console.log(
      `Gameserver Dry Run Exec (${currentGameserverPath}): screen -m -d -S serverscreen${
        server.id
      } wine ${
        args.disableWSE === true
          ? 'mb_warband_dedicated.exe'
          : 'WSELoaderServer.exe'
      } -r "Configs/${args.config}" -m "${args.module}"`
    );
  }

  server.gameserverLastModule = args.module;
  server.gameserverLastConfig = args.config;
  server.gameserverDisableWSE = !!args.disableWSE;
  await server.save();

  server.gameserverOnline = true;

  return server;
};
