import { gql } from 'apollo-server-koa';

export default gql`
  type Query {
    server(id: Int!): Server
    servers: [Server]
    
    item(id: Int): Item
    items: [Item]

    adminPermission(admin: String, serverID: Int): [AdminPermission]
    adminPermissions: [AdminPermission]
  }
`;
