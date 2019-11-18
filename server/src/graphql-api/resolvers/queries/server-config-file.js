import fs from 'fs';
import path from 'path';

import { parseConfig } from '../../../utils/server-config-parser';

export default {
  Server: {
    serverConfigFile: async (parent, filter) => {
      const currentGameserverPath = path.join(
        require.resolve('gameservers'),
        `../${parent.id}`
      );
      if (!fs.existsSync(currentGameserverPath))
        throw new Error('Server folder does not exist!');

      const configFolderPath = path.join(currentGameserverPath, '/Configs');
      if (!fs.existsSync(currentGameserverPath))
        throw new Error('Configs folder does not exist!');

      const configFilePath = path.join(configFolderPath, `/${filter.name}`);
      if (!fs.existsSync(configFilePath)) return null;

      const rawConfig = await fs.promises.readFile(configFilePath, 'utf8');

      return {
        server: parent.id,
        name: filter.name,
        config: parseConfig(rawConfig),
        rawConfig: rawConfig
      };
    },

    serverConfigFiles: async parent => {
      const currentGameserverPath = path.join(
        require.resolve('gameservers'),
        `../${parent.id}`
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
        .map(file => ({ server: parent.id, name: file.name }));

      return files;
    }
  }
};
