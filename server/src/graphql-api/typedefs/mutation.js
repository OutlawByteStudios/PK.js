import { gql } from 'apollo-server-koa';

export default gql`
  type Mutation {
    createServer(name: String!, welcomeMessage: String): Server
    deleteServer(serverID: Int!): Server
    saveServerConfig(serverID: Int!, name: String!, config: String!): ServerConfigFile

    addAdminPermission(serverID: Int!, steamID: String!): AdminPermission
    removeAdminPermission(serverID: Int!, steamID: String!): AdminPermission
    updateAdminPermission(
      serverID: Int!
      steamID: String!
      guid: String
      manageAssignPermissions: Int
      viewAdminPermissions: Int
      adminTools: Int
      adminPanel: Int
      adminMute: Int
      adminKick: Int
      adminTemporaryBan: Int
      adminPermanentBan: Int
      adminKillFade: Int
      adminFreeze: Int
      adminSpectate: Int
      adminTeleport: Int
      adminHealSelf: Int
      adminGodlike: Int
      adminJoinFactions: Int
      adminAnnouncements: Int
      adminPolls: Int
      adminShips: Int
      adminGold: Int
      adminItems: Int
      adminAllItems: Int
      adminFactions: Int
      adminAnimals: Int
    ): AdminPermission
    
    addBan(serverID: Int!, guid: String!, publicReason: String!, privateReason: String!, length: Int!): Ban
    addWarning(serverID: Int!, guid: String!, publicReason: String!, privateReason: String!): Warning
    addNote(serverID: Int!, guid: String!, note: String!): Note
    
    deleteBan(banID: String!): Ban
    deleteWarning(warningID: String!): Warning
    deleteNote(noteID: String!): Note
    
    wipePlayerName(serverID: Int!, name: String!): PlayerName
  }
`;
