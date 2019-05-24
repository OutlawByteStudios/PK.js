import { gql } from 'apollo-boost';

const QUERY = gql`
  query AdminPermission($serverID: Int!, $selectedAdminSteamID: String!, $currentAdminSteamID: String!) {
    server(id: $serverID) {
      selectedAdmin: adminPermission(steamID: $selectedAdminSteamID) {        
        admin {
          steamID
          displayName
          avatar
        }
        player {
          guid
        }
        
        manageAssignPermissions
        viewAdminPermissions
        adminTools
        adminPanel
        adminMute
        adminKick
        adminTemporaryBan
        adminPermanentBan
        adminKillFade
        adminFreeze
        adminSpectate
        adminTeleport
        adminHealSelf
        adminGodlike
        adminJoinFactions
        adminAnnouncements
        adminPolls
        adminShips
        adminGold
        adminItems
        adminAllItems
        adminFactions
        adminAnimals
      }
      currentAdmin: adminPermission(steamID: $currentAdminSteamID) {
        admin {
          steamID
        }
        
        manageAssignPermissions
        viewAdminPermissions
        adminTools
        adminPanel
        adminMute
        adminKick
        adminTemporaryBan
        adminPermanentBan
        adminKillFade
        adminFreeze
        adminSpectate
        adminTeleport
        adminHealSelf
        adminGodlike
        adminJoinFactions
        adminAnnouncements
        adminPolls
        adminShips
        adminGold
        adminItems
        adminAllItems
        adminFactions
        adminAnimals
      }
    }
  }
`;

const MUTATION = gql`
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
    admin {
      steamID
      displayName
      avatar
    }
    player {
      guid
    }
    
    manageAssignPermissions
    viewAdminPermissions
    adminTools
    adminPanel
    adminMute
    adminKick
    adminTemporaryBan
    adminPermanentBan
    adminKillFade
    adminFreeze
    adminSpectate
    adminTeleport
    adminHealSelf
    adminGodlike
    adminJoinFactions
    adminAnnouncements
    adminPolls
    adminShips
    adminGold
    adminItems
    adminAllItems
    adminFactions
    adminAnimals
  }
}
`;

export {
  QUERY,
  MUTATION
}