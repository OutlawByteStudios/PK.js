import gameserverStatusCache from '../../../utils/gameserver-status-cache';

export default {
  Server: {
    gameserverOnline: async parent => {
      console.log('run');
      return gameserverStatusCache.gameserverOnline(parent.id);
    }
  }
};
