import { gql } from 'apollo-server-koa';

export default gql`
  type Mutation {
    createServer(name: String!, welcomeMessage: String): Server

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
  }
`;

/*

mutation UpdateAdminPermission(
    $serverID: Int!
    $steamID: String!
    $guid: String
    $manageAssignPermissions: Int
    $viewAdminPermissions: Int
    $adminTools: Int
    $adminPanel: Int
    $adminMute: Int
    $adminKick: Int
    $adminTemporaryBan: Int
    $adminPermanentBan: Int
    $adminKillFade: Int
    $adminFreeze: Int
    $adminSpectate: Int
    $adminTeleport: Int
    $adminHealSelf: Int
    $adminGodlike: Int
    $adminJoinFactions: Int
    $adminAnnouncements: Int
    $adminPolls: Int
    $adminShips: Int
    $adminGold: Int
    $adminItems: Int
    $adminAllItems: Int
    $adminFactions: Int
    $adminAnimals: Int
){
  updateAdminPermission(
    serverID: $serverID
    steamID: $steamID
    guid: $guid
    manageAssignPermissions: $manageAssignPermissions
    viewAdminPermissions: $viewAdminPermissions
    adminTools: $adminTools
    adminPanel: $adminPanel
    adminMute: $adminMute
    adminKick: $adminKick
    adminTemporaryBan: $adminTemporaryBan
    adminPermanentBan: $adminPermanentBan
    adminKillFade: $adminKillFade
    adminFreeze: $adminFreeze
    adminSpectate: $adminSpectate
    adminTeleport: $adminTeleport
    adminHealSelf: $adminHealSelf
    adminGodlike: $adminGodlike
    adminJoinFactions: $adminJoinFactions
    adminAnnouncements: $adminAnnouncements
    adminPolls: $adminPolls
    adminShips: $adminShips
    adminGold: $adminGold
    adminItems: $adminItems
    adminAllItems: $adminAllItems
    adminFactions: $adminFactions
    adminAnimals: $adminAnimals
  ) {

  }
}

 */
