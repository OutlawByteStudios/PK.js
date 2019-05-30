import { gql } from 'apollo-boost';

import Fragments from '../../fragments/index';

export default gql`
  query AdminPermissions($serverID: Int!){
    adminPermissions(serverID: $serverID){
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
