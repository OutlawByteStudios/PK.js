import { gql } from "apollo-boost";

export default gql`
  query AdminList($serverID: Int!){
    server(id: $serverID){
      adminPermissions {
        admin {
          steamID
          displayName
          avatar
        }
        player {
          guid
        }
      }
    }
  }
`;