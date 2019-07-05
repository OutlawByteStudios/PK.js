import { execSync } from 'child_process';

import getServerStatus from './get-gameserver-status';

import serverConfig from '../../server-config';


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
    let gameserverOnline;

    if (serverConfig.gameserverDevDryRun)
      gameserverOnline = serverConfig.gameserverDevDryRunOnline;
    else
      gameserverOnline = !execSync(
        `screen -S serverscreen${serverID} -Q select . ; echo $?`
      )
        .toString()
        .includes('No screen session found.');

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

  async fetchGameserverStatus(host, port){
    let gameserverStatus = await getServerStatus(host, port);
    this.gameserverStatusCache[`${host}:${port}`] = {
      gameserverStatus,
      lastFetched: Date.now()
    }
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
