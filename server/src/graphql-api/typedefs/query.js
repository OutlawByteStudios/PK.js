import { gql } from 'apollo-server-koa';

export default gql`
  type Query {
    steamUser(steamID: String!): SteamUser
    steamUsers(displayNameLike: String): [SteamUser]

    item(id: Int): Item
    items: [Item]

    server(id: Int!): Server
    servers: [Server]

    adminPermission(serverID: Int!, steamID: String!): AdminPermission
    adminPermissions(serverID: Int, steamID: String): [AdminPermission]

    linkedPlayers: [Player]
  }
`;
