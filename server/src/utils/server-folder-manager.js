import fs from 'fs';
import path from 'path';
import cprp from 'cpr-promise';

import { buildConfig, parseConfig } from './server-config-parser';
import serverConfig from '../../server-config';
import del from 'del';

const installServer = async server => {
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

  /* Update Server Name & Port in Config Files */
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
};

const deleteServer = async (server, deleteLogs = true) => {
  /* Delete server folder */
  const currentGameserverPath = path.join(
    require.resolve('gameservers'),
    `../${server.id}`
  );
  if (!fs.existsSync(currentGameserverPath)) return server;

  let files = [currentGameserverPath];
  if (!deleteLogs) files.push(path.join(currentGameserverPath, '/logs'));

  await del(files, { force: true });
};

const reinstallServer = async server => {
  await deleteServer(server, false);
  await installServer(server);
};

export { installServer, deleteServer, reinstallServer };
