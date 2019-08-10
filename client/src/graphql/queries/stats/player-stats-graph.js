import { gql } from 'apollo-boost';

export default gql`
  query PlayerStatsGraph($serverID: Int!, $steamID: String!, $guid: String!, $startDate: Date, $stopDate: Date){
    server(id: $serverID){
      _id
      
      player(guid: $guid){
        _id
        
        playerStats(startDate: $startDate, stopDate: $stopDate){
          _id
          date
          totalGold
        }
      }
    }
    
    adminPermission(serverID: $serverID, steamID: $steamID){
      viewServerStats
    }
  }
`;
