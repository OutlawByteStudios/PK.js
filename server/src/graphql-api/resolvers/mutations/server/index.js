import createServer from './create-server';
import deleteServer from './delete-server';
import reinstallServer from './reinstall-server';
import renameServer from './rename-server';
import restartServer from './restart-server';
import saveCustomBanList from './save-custom-ban-list';
import saveServerConfig from './save-server-config';
import startServer from './start-server';
import stopServer from './stop-server';
import useCustomBanList from './use-custom-ban-list';

export default {
  Mutation: {
    createServer,
    deleteServer,
    reinstallServer,
    renameServer,
    restartServer,
    saveCustomBanList,
    saveServerConfig,
    startServer,
    stopServer,
    useCustomBanList
  }
};
