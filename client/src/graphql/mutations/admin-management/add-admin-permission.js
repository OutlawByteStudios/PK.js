import { gql } from 'apollo-boost';

import Fragments from '../../fragments';

export default gql`
  mutation AddAdminPermission($serverID: Int!, $steamID: String!){
    addAdminPermission(serverID: $serverID, steamID: $steamID) {
      admin {
        _id
        
        steamID
        displayName
        avatar
      }
      
      player {
        _id
        guid
      }
      
      ...AdminPermission
    }
  }
  
  ${Fragments.AdminPermission}
`;
