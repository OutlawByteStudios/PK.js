import { gql } from 'apollo-boost';

import Fragments from '../../fragments';

export default gql`
  query BanList($serverID: Int!, $active: Boolean!){
    server(id: $serverID){
      _id
      
      bans(active: $active){
          _id
          
          player {
            guid
          }
          
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
    }
  }
 
  ${Fragments.SteamUser}
`;
