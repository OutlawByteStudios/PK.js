import { gql } from 'apollo-server-koa';

export default gql`
  type AdminLog @fieldViewPermission(requiresAdminPermission: "viewAdminLogs") {
    _id: String
    hasMore: Boolean

    server: Server
    admin: SteamUser

    type: String
    date: Date

    targetPlayer: Player
    targetAdmin: SteamUser

    reason: String

    length: Int
    ipBanned: Boolean

    amount: Int
    adjustmentType: String
    recipientPlayer: Player
    from: String

    name: String
  }
`;
