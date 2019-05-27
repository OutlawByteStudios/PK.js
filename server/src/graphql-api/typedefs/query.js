import { gql } from 'apollo-server-koa';

export default gql`
  type Query {
    steamuser(steamID: String!): SteamUser

    item(id: Int): Item
    items: [Item]
    
    server(id: Int!): Server
    servers: [Server]

    adminPermission(serverID: Int!, steamID: String!): AdminPermission
    adminPermissions(serverID: Int, steamID: String): [AdminPermission]
  }
`;
