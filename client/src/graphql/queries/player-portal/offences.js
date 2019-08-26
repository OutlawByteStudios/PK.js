import { gql } from 'apollo-boost';

import Fragments from '../../fragments';

export default gql`
  query Offences($serverID: Int!, $guid: String!){
    server(id: $serverID){
      _id
      
      player(guid: $guid){
        _id
            
        bans {
          _id
          
          admin {
            ...SteamUser
          }
          publicReason
          startDate
          endDate
          unbannedDate
        }
        
        warnings {
          _id
          
          admin {
            ...SteamUser
          }
          
          publicReason
          date
        }
      }
    }
  }
 
  ${Fragments.SteamUser}
`;
