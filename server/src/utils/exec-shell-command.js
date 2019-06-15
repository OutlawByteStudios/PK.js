import { exec } from 'child_process';

export default (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if(error || stderr) reject(error || stderr);
      resolve(stdout);
    });
  });
}