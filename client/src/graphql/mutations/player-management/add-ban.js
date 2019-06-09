import { gql } from 'apollo-boost';

import Fragments from '../../fragments';

export default gql`
  mutation AddBan($serverID: Int!, $guid: String!, $publicReason: String!, $privateReason: String!, $length: Int!){
    addBan(serverID: $serverID, guid: $guid, publicReason: $publicReason, privateReason: $privateReason, length: $length) {
      _id
      
      admin {
        ...SteamUser
      }
      
      privateReason
      publicReason
      startDate
      endDate
    }
  }
  
  ${Fragments.SteamUser}
`;
