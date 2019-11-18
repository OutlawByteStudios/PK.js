import fs from 'fs';
import path from 'path';

export default {
  Server: {
    customBanList: async parent => {
      const currentGameserverPath = path.join(
        require.resolve('gameservers'),
        `../${parent.id}`
      );
      if (!fs.existsSync(currentGameserverPath))
        throw new Error('Server folder does not exist!');

      const customBanListFile = path.join(
        currentGameserverPath,
        '/custom_bans.txt'
      );
      if (!fs.existsSync(customBanListFile))
        throw new Error('Custom ban list file does not exist!');

      return fs.promises.readFile(customBanListFile, 'utf8');
    }
  }
};
