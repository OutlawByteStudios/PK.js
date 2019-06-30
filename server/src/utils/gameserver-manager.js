class GameserverManager {
  servers = {};

  stopServer(serverID) {
    this.servers[serverID].process.kill();
  }

  restartServer(serverID) {
    this.stopServer(serverID);
    this.startServer(
      serverID,
      this.servers[serverID].serverPath,
      this.servers[serverID].module,
      this.servers[serverID].config,
      this.servers[serverID].options
    );
  }
}

export default new GameserverManager();
