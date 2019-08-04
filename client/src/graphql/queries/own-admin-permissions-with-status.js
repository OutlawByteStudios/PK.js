import { gql } from 'apollo-boost';

import Fragments from '../fragments';

export default gql`
  query OwnAdminPermissions($steamID: String!){
    adminPermissions(steamID: $steamID){
      server {
        ...Server
        
        serverStatus{
          _id
          Name
          ModuleName
          MapName
          NumberOfActivePlayers
          MaxNumberOfPlayers
          HasPassword
        }
      }
            
      ...AdminPermission
    }
  }
  
  ${Fragments.Server}
  ${Fragments.AdminPermission}
`;
