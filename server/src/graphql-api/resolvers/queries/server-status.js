import { assignPorts } from '../../../utils/server-config-parser';
import gameserverStatusCache from '../../../utils/gameserver-status-cache';

export default {
  Server: {
    serverStatus: async parent => {
      if (!(await gameserverStatusCache.gameserverOnline(parent.id)))
        return null;
      const ports = assignPorts(parent.id);
      return gameserverStatusCache.gameserverStatus('localhost', ports.port);
    }
  }
};
