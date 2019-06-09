import { gql } from 'apollo-boost';

import Fragments from '../../fragments';

export default gql`
  mutation AddWarning($serverID: Int!, $guid: String!, $publicReason: String!, $privateReason: String!){
    addWarning(serverID: $serverID, guid: $guid, publicReason: $publicReason, privateReason: $privateReason) {
      _id
      
      admin {
        ...SteamUser
      }
      
      privateReason
      publicReason
      date
    }
  }
  
  ${Fragments.SteamUser}
`;
