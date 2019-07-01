import { execSync } from 'child_process';

import serverConfig from '../../../../server-config';

export default {
  Server: {
    gameserverOnline: async parent => {
      if (!serverConfig.gameserverDevDryRun) {
        return !execSync(`screen -S serverscreen${parent.id} -Q select . ; echo $?`).toString().includes('No screen session found.');
      } else {
        return serverConfig.gameserverDevDryRunOnline;
      }
    }
  }
};
