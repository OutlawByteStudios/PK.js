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

  if (!serverConfig.gameserverDevDryRun) {
    execSync(`screen -S serverscreen${server.id} -X quit`);
  } else {
    console.log(
      `Gameserver Dry Run Exec: screen -S serverscreen${server.id} -X quit`
    );
  }

  const currentGameserverPath = path.join(
    require.resolve('gameservers'),
    `../${server.id}`
  );
  if (!fs.existsSync(currentGameserverPath))
    throw new Error('Server folder does not exist!');

  const executablePath = path.join(
    currentGameserverPath,
    server.gameserverDisableWSE === true
      ? '/mb_warband_dedicated.exe'
      : '/WSELoaderServer.exe'
  );
  if (!fs.existsSync(executablePath))
    throw new Error('Executable does not exist!');

  const moduleFolder = path.join(
    currentGameserverPath,
    `/Modules/${server.gameserverLastModule}`
  );
  if (!fs.existsSync(moduleFolder)) throw new Error('Module does not exist!');

  let configFile = path.join(
    currentGameserverPath,
    `/Configs/${server.gameserverLastConfig}`
  );
  if (!fs.existsSync(configFile)) throw new Error('Config does not exist!');

  if (!serverConfig.gameserverDevDryRun) {
    execSync(
      `screen -m -d -S serverscreen${server.id} wine ${
        server.gameserverDisableWSE === true
          ? 'mb_warband_dedicated.exe'
          : 'WSELoaderServer.exe'
      } -r "Configs/${server.gameserverLastConfig}" -m "${
        server.gameserverLastModule
      }"`,
      {
        cwd: currentGameserverPath
      }
    );
  } else {
    console.log(
      `Gameserver Dry Run Exec (${currentGameserverPath}): screen -m -d -S serverscreen${
        server.id
      } wine ${
        server.gameserverDisableWSE === true
          ? 'mb_warband_dedicated.exe'
          : 'WSELoaderServer.exe'
      } -r "Configs/${server.gameserverLastConfig}" -m "${
        server.gameserverLastModule
      }"`
    );
  }

  server.gameserverOnline = true;

  return server;
};
