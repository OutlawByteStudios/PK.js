import { isServerOnline } from './gameserver-instance-tools';
import getServerStatus from './get-gameserver-status';

// every minute check screen is still alive
const GAMESERVER_ONLINE_CACHE_TIME = 60 * 1000;

// event 15 seconds update player count
const GAMESERVER_STATUS_CACHE_TIME = 15 * 1000;

// disable caching
const DISABLE_CACHE = false;

class GameserverStatusCache {
  gameserverOnlineCache = {};
  gameserverStatusCache = {};

  fetchGameserverOnline(serverID) {
    let gameserverOnline = isServerOnline(serverID);

    this.gameserverOnlineCache[serverID] = {
      gameserverOnline,
      lastFetched: Date.now()
    };

    return gameserverOnline;
  }

  gameserverOnline(serverID) {
    if (
      DISABLE_CACHE ||
      !this.gameserverOnlineCache[serverID] ||
      this.gameserverOnlineCache[serverID].lastFetched <
        Date.now() - GAMESERVER_ONLINE_CACHE_TIME
    )
      this.fetchGameserverOnline(serverID);

    return this.gameserverOnlineCache[serverID].gameserverOnline;
  }

  async fetchGameserverStatus(host, port) {
    let gameserverStatus = await getServerStatus(host, port);
    this.gameserverStatusCache[`${host}:${port}`] = {
      gameserverStatus,
      lastFetched: Date.now()
    };
  }

  async gameserverStatus(host, port) {
    if (
      DISABLE_CACHE ||
      !this.gameserverStatusCache[`${host}:${port}`] ||
      this.gameserverStatusCache[`${host}:${port}`].lastFetched <
        Date.now() - GAMESERVER_STATUS_CACHE_TIME
    )
      await this.fetchGameserverStatus(host, port);

    return this.gameserverStatusCache[`${host}:${port}`].gameserverStatus;
  }
}

export default new GameserverStatusCache();
