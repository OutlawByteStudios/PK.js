import { execSync } from 'child_process';
import { Server } from '../../../models';

import serverConfig from '../../../../server-config';

function serverOnline(server) {
  if (!serverConfig.gameserverDevDryRun) {
    return !execSync(`screen -S serverscreen${server.id} -Q select . ; echo $?`).toString().includes('No screen session found.');
  } else {
    return serverConfig.gameserverDevDryRunOnline;
  }
}

export default {
  Query: {
    server: async (parent, filter) => {
      const server = await Server.findOne({ id: filter.id });
      server.gameserverOnline = serverOnline(server);
      return server;
    },

    servers: async () => {
      const server = await Server.find();
      server.gameserverOnline = serverOnline(server);
      return server;
    }
  },

  AdminLog: {
    server: async parent => {
      const server = await Server.findOne({ id: parent.server });
      server.gameserverOnline = serverOnline(server);
      return server;
    }
  },

  AdminPermission: {
    server: async parent => {
      const server = await Server.findOne({ id: parent.server });
      server.gameserverOnline = serverOnline(server);
      return server;
    }
  }
};
