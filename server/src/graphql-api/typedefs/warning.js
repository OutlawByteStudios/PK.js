import { gql } from 'apollo-server-koa';

export default gql`
  type Warning
    @fieldViewPermission(
      requiresAdminPermission: "viewWarnings"
      viewIfPlayer: true
    ) {
    _id: String

    server: Int
    player: Player

    admin: SteamUser

    publicReason: String
    privateReason: String
      @fieldViewPermission(requiresAdminPermission: "viewWarnings")

    date: Date
  }
`;
