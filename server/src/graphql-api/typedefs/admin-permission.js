import { gql } from 'apollo-server-koa';

export default gql`
  type AdminPermission {
    _id: String

    server: Server
    admin: SteamUser
    player: Player

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
    
    adminLogs(admin: String, filter: [String], page: Boolean, startingAfter: String, endingBefore: String): [AdminLog]
  }
`;
