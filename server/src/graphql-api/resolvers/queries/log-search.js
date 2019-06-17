import fs from 'fs';
import path from 'path';

import { spawn } from 'child_process';

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

      const inputArgs = {};

      const child = spawn('../../../../log-engine/log_engine', []);
      child.stdin.setEncoding = 'utf-8';
      child.stdin.write(JSON.stringify(inputArgs));
      child.stdin.end();

      return new Promise((resolve, reject) => {
        child.stdout.on('data', data => {
          resolve(data);
        });

        child.stderr.on('data', data => {
          reject(data);
        })
      });
    }
  }
};
