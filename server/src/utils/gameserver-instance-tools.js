import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

import { Server } from '../models';

import gameserverStatusCache from './gameserver-status-cache';

import serverConfig from '../../server-config';

const startServer = async (serverID, module, config) => {
  const currentGameserverPath = path.join(
    require.resolve('gameservers'),
    `../${serverID}`
  );
  if (!fs.existsSync(currentGameserverPath))
    throw new Error('Server folder does not exist!');

  const executablePath = path.join(
    currentGameserverPath,
    '/WSELoaderServer.exe'
  );
  if (!fs.existsSync(executablePath))
    throw new Error('Executable does not exist!');

  const moduleFolder = path.join(currentGameserverPath, `/Modules/${module}`);
  if (!fs.existsSync(moduleFolder)) throw new Error('Module does not exist!');

  let configFile = path.join(currentGameserverPath, `/Configs/${config}`);
  if (!fs.existsSync(configFile)) throw new Error('Config does not exist!');

  if (!serverConfig.gameserverDevDryRun) {
    execSync(
      `screen -m -d -S serverscreen${serverID} wine WSELoaderServer.exe -r "Configs/${config}" -m "${module}"`,
      {
        cwd: currentGameserverPath
      }
    );
  } else {
    console.log(
      `Gameserver Dry Run Exec (${currentGameserverPath}): screen -m -d -S serverscreen${serverID} wine WSELoaderServer.exe -r "Configs/${config}" -m "${module}"`
    );
  }

  gameserverStatusCache.fetchGameserverOnline(serverID);
};

const stopServer = async serverID => {
  if (!serverConfig.gameserverDevDryRun) {
    execSync(`screen -S serverscreen${serverID} -X quit`);
  } else {
    console.log(
      `Gameserver Dry Run Exec: screen -S serverscreen${serverID} -X quit`
    );
  }

  gameserverStatusCache.fetchGameserverOnline(serverID);
};

const restartServer = async (serverID, module, config) => {
  await stopServer(serverID);

  if (!module || !config) {
    let server = await Server.findOne({ id: serverID });
    module = server.gameserverLastModule;
    config = server.gameserverLastConfig;
  }

  await startServer(serverID, module, config);
};

const isServerOnline = async serverID => {
  if (serverConfig.gameserverDevDryRun)
    return serverConfig.gameserverDevDryRunOnline;
  else
    return !execSync(`screen -S serverscreen${serverID} -Q select . ; echo $?`)
      .toString()
      .includes('No screen session found.');
};

export { startServer, stopServer, restartServer, isServerOnline };
