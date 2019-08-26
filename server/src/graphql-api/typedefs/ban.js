import { gql } from 'apollo-server-koa';

export default gql`
  type Ban
    @fieldViewPermission(
      requiresAdminPermission: "viewBans"
      viewIfPlayer: true
    ) {
    _id: String
    server: Int
    player: Player

    admin: SteamUser

    privateReason: String
      @fieldViewPermission(requiresAdminPermission: "viewBans")
    publicReason: String

    startDate: Date
    endDate: Date
    unbannedDate: Date

    ipBan: Boolean @fieldViewPermission(requiresAdminPermission: "viewBans")
  }
`;
