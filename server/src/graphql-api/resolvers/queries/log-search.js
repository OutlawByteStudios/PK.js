import fs from 'fs';
import path from 'path';
// import exec from '../../../utils/exec-shell-command';

export default {
  Server: {
    logSearch: (parent, filter) => {
      const currentGameserverPath = path.join(
        require.resolve('gameservers'),
        `../${parent.id}`
      );
      if (!fs.existsSync(currentGameserverPath))
        throw new Error('Server folder does not exist!');

      const logFolderPath = path.join(currentGameserverPath, '/logs');
      if (!fs.existsSync(logFolderPath))
        throw new Error('Logs folder does not exist!');

      return 'temp';

      // return exec(`./log-engine --some-param ${varStoringParamValue}`);
    }
  }
}