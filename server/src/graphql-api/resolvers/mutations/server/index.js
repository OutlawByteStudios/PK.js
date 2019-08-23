import createServer from './create-server';
import deleteServer from './delete-server';
import reinstallServer from './reinstall-server';
import renameServer from './rename-server';
import restartServer from './restart-server';
import saveServerConfig from './save-server-config';
import startServer from './start-server';
import stopServer from './stop-server';

export default {
  Mutation: {
    createServer,
    deleteServer,
    reinstallServer,
    renameServer,
    restartServer,
    saveServerConfig,
    startServer,
    stopServer
  }
};
