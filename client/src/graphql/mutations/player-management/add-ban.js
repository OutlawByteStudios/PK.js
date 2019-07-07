import { gql } from 'apollo-boost';

import Fragments from '../../fragments';

export default gql`
  mutation AddBan($serverID: Int!, $guid: String!, $publicReason: String!, $privateReason: String!, $length: Int!, $ipBan: Boolean){
    addBan(serverID: $serverID, guid: $guid, publicReason: $publicReason, privateReason: $privateReason, length: $length, ipBan: $ipBan) {
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
  }
  
  ${Fragments.SteamUser}
`;
