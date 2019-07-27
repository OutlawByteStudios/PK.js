import { gql } from 'apollo-boost';

import Fragments from '../../fragments';

export default gql`
  query AdminLogs($serverID: Int!, $steamID: String!, $admin: String, $filter: [String], $startingAfter: String, $endingBefore: String){
    server(id: $serverID){
      _id
      adminLogs(admin: $admin, filter: $filter, page: true, startingAfter: $startingAfter, endingBefore: $endingBefore){
        _id
        hasMore
        
        admin{
          ...SteamUser
        }
        
        type
        date
        
        targetPlayer{
          _id
          guid
        }
        targetAdmin{
          ...SteamUser
        }
        
        reason
        
        length
        ipBanned
        
        amount
        adjustmentType
        recipientPlayer{
          _id
          guid
        }
        from
        
        name
      }
    }
    
    adminPermission(serverID: $serverID, steamID: $steamID){
      viewAdminLogs
    }
  }
  
  ${Fragments.SteamUser}
`;
