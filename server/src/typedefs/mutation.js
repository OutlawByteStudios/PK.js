import { gql } from 'apollo-server-koa';

export default gql`
  type Mutation {
  
    addAdminPermission(
      serverID: Int!
      steamID: String!
    ): AdminPermission
    
    removeAdminPermission(
      serverID: Int!
      steamID: String!
    ): AdminPermission
    
  }
`;
