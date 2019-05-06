import { gql } from 'apollo-boost';

const ADD_ADMIN_PERMISSION = gql`
  mutation AddAdminPermission($serverID: Int!, $steamID: String!){
    addAdminPermission(serverID: $serverID, steamID: $steamID) {
      admin {
        steamID
        displayName
        avatar
      }
    }
  }
`;

const REMOVE_ADMIN_PERMISSION = gql`
  mutation RemoveAdminPermission($serverID: Int!, $steamID: String!){
    removeAdminPermission(serverID: $serverID, steamID: $steamID) {
      admin {
        steamID
        displayName
        avatar
      }
    }
  }
`;

export {
  ADD_ADMIN_PERMISSION,
  REMOVE_ADMIN_PERMISSION
};
