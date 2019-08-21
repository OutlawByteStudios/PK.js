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

      let [
        date,
        startTime,
        endTime,
        ...searchTerms
      ] = filter.searchString.split(';');

      const logFilePath = path.join(logFolderPath, `server_log_${date}.txt`);

      if (!fs.existsSync(logFilePath)) return JSON.stringify([]);

      const logEnginePath = path.join(require.resolve('log-engine'), '..');

      const payload = { searchTerms };
      if (startTime !== 'null') payload.startTime = startTime;
      if (endTime !== 'null') payload.endTime = endTime;

      const inputArgs = {
        configFile: path.join(logEnginePath, '/resources/config.json'),
        prettyPrinting: false,
        function: 0,
        serverLogFile: logFilePath,
        payload: JSON.stringify(payload)
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

        child.stderr.on('error', data => {
          error += data.toString();
        });

        child.on('close', () => {
          if (error !== '') reject(error);
          else resolve(result);
        });
      });
    }
  }
};
