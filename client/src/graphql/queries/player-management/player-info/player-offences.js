import { gql } from 'apollo-boost';

import Fragments from '../../../fragments';

export default gql`
  query PlayerOffences($serverID: Int!, $guid: String!){
    server(id: $serverID){
      _id
      
      player(guid: $guid){
        _id
        
        guid
        
        ipBanned {
          guid
        }
            
        bans {
          _id
          
          admin {
            ...SteamUser
          }
          
          privateReason
          publicReason
          startDate
          endDate
          unbannedDate
          
          ipBan
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
