import { gql } from 'apollo-boost';

export default gql`
  mutation RemoveAdminPermission($serverID: Int!, $steamID: String!){
    removeAdminPermission(serverID: $serverID, steamID: $steamID) {
      _id
    }
  }
`;
