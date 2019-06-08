import createServer from './create-server';
import deleteServer from './delete-server';
import saveServerConfig from './save-server-config';

export default {
  Mutation: {
    createServer,
    deleteServer,
    saveServerConfig
  }
};
