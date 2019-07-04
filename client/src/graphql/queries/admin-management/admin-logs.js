import { gql } from 'apollo-boost';

import Fragments from '../../fragments';

export default gql`
  query AdminLogs($serverID: Int!, $admin: String, $filter: [String], $startingAfter: String, $endingBefore: String){
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
          guid
        }
        targetAdmin{
          ...SteamUser
        }
        
        reason
        
        length
        
        amount
        from
        
        name
      }
    }
  }
  
  ${Fragments.SteamUser}
`;
