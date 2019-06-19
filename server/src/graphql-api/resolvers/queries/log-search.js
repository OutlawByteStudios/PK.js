import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

import moment from 'moment';

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

      const date = moment(filter.date);

      //const logFilePath = path.join(logFolderPath, `server_log_${date.format('MM_DD_YY')}.txt`);
      const logFilePath = path.join(logFolderPath, `server_log_06_16_19.txt`);

      if(!fs.existsSync(logFilePath)) throw new Error('Log file does not exist!');

      const logEnginePath = path.join(require.resolve('log-engine'), '..');

      const inputArgs = {
        serverLogFile: logFilePath,
        payload: JSON.stringify({
          searchTerms: filter.search
        }),
        configFile: path.join(logEnginePath, '/config.json'),
        function: 0,
        prettyPrinting: false
      };

      const child = spawn(path.join(logEnginePath, '/log_engine'));
      child.stdin.setEncoding = 'utf-8';
      child.stdin.write(JSON.stringify(inputArgs));
      child.stdin.end();

      let result = '';
      let error = '';

      return new Promise((resolve, reject) => {
        child.stdout.on('data', data => {
          result += data.toString();
        });

        child.stderr.on('data', data => {
          error += data.toString();
        });

        child.on('close', code => {
          if(error !== '') reject(error);
          else resolve(result);
        });
      });
    }
  }
};
