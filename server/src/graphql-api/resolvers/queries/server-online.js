import gameserverStatusCache from '../../../utils/gameserver-status-cache';

export default {
  Server: {
    gameserverOnline: async parent => {
      return gameserverStatusCache.gameserverOnline(parent.id);
    }
  }
};
