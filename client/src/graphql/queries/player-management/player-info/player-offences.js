import { gql } from 'apollo-boost';

import Fragments from '../../../fragments';

export default gql`
  query PlayerOffences($serverID: Int!, $guid: String!){
    server(id: $serverID){
      _id
      
      player(guid: $guid){
        _id
            
        bans {
          _id
          
          admin {
            ...SteamUser
          }
          
          privateReason
          publicReason
          startDate
          endDate
        }
        
        warnings {
          _id
          
          admin {
            ...SteamUser
          }
          
          privateReason
          publicReason
          date
        }
        
        notes {
          _id
          
          admin {
            ...SteamUser
          }
          
          note
          date
        }
      }
    }
  }
 
  ${Fragments.SteamUser}
`;
