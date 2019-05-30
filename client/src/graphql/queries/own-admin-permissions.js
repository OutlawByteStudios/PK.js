import { gql } from 'apollo-boost';

import Fragments from '../fragments';

export default gql`
  query OwnAdminPermissions($steamID: String!){
    adminPermissions(steamID: $steamID){
      server {
        ...Server
      }
            
      ...AdminPermission
    }
  }
  
  ${Fragments.Server}
  ${Fragments.AdminPermission}
`;
