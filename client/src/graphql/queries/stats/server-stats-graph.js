import { gql } from 'apollo-boost';

export default gql`
  query ServerStatsGraph($serverID: Int!, $steamID: String!, $startDate: Date, $stopDate: Date){
    server(id: $serverID){
      _id
      
      serverStats(startDate: $startDate, stopDate: $stopDate){
        _id
        date
    
        uniqueGUIDs
        uniqueIPs
    
        adminCount
    
        totalBans
        totalWarnings
        totalNotes
    
        playerCount
        currentMap
    
        totalGold
        totalBankGold
        totalPouchGold
        bankLimit
      }
    }
    
    adminPermission(serverID: $serverID, steamID: $steamID){
      viewServerStats
    }
  }
`;
