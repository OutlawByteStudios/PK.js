import { gql } from "apollo-boost";

export default gql`
  query AdminPermission($serverID: Int!, $steamID: String!) {
    server(id: $serverID) {
      selectedAdmin: adminPermission(steamID: $steamID) {
        admin {
          steamID
          displayName
          avatar
        }
        
        manageAdminAssignPermissions
        hasViewAdminPermissions
        assignViewAdminPermissions
      }
      currentAdmin: adminPermission(steamID: $steamID) {
        manageAdminAssignPermissions
        hasViewAdminPermissions
        assignViewAdminPermissions  
      }
    }
  }
`;