import { gql } from 'apollo-server-koa';

import { panelPermissions, gamePermissions } from 'shared/constants';

const addPermissions = () => {
  let permissions = '';
  for (let permission of panelPermissions.concat(gamePermissions)) {
    permissions += `${permission.permission}: Int\n`;
  }
  return permissions;
};

export default gql`
  type Mutation {
    createServer(
      name: String!
      welcomeMessage: String
      defaultBankGold: Int
      defaultPouchGold: Int
      defaultBankLimit: Int
      recordStats: Boolean
      gameserverRestartCron: String
    ): Server
    renameServer(serverID: Int!, name: String!): Server
    reinstallServer(serverID: Int!): Server
    deleteServer(serverID: Int!): Server

    saveServerConfig(
      serverID: Int!
      name: String!
      config: String!
    ): ServerConfigFile
    
    useCustomBanList(serverID: Int!, on: Boolean!): Server
    saveCustomBanList(serverID: Int!, customBanList: String!): Server

    startServer(serverID: Int!, module: String!, config: String!): Server
    stopServer(serverID: Int!): Server
    restartServer(serverID: Int!): Server

    clearPlayerLocations(serverID: Int!): [Player]

    addBan(
      serverID: Int!
      guid: String!
      publicReason: String!
      privateReason: String!
      length: Int!
      ipBan: Boolean
    ): Ban
    addWarning(
      serverID: Int!
      guid: String!
      publicReason: String!
      privateReason: String!
    ): Warning
    addNote(serverID: Int!, guid: String!, note: String!): Note

    unBan(banID: String!, reason: String!): Ban
    deleteBan(banID: String!, reason: String!): Ban
    deleteWarning(warningID: String!, reason: String!): Warning
    deleteNote(noteID: String!, reason: String!): Note

    adjustGold(
      serverID: Int!
      guid: String!
      type: String
      amount: Int!
      pouch: Boolean
      recipient: String
      reason: String!
    ): Player
    stripPlayer(serverID: Int!, guid: String!, reason: String!): Player

    wipePlayerName(serverID: Int!, name: String!): PlayerName

    addAdminPermission(serverID: Int!, steamID: String!): AdminPermission
    removeAdminPermission(serverID: Int!, steamID: String!): AdminPermission
    updateAdminPermission(
      serverID: Int!
      steamID: String!
      guid: String
      ${addPermissions()}
    ): AdminPermission
    
    
    linkSteamUser(guid: String!, pin: String!): Player
  }
`;
