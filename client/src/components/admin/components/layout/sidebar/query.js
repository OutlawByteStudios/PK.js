import { gql } from "apollo-boost";

export default gql`
  query ServerLinks($serverID: Int!, $steamID: String!){
    server(id: $serverID){
      name
      adminPermission(steamID: $steamID){
        hasViewAdminPermissions
      }
    }
  }
`;