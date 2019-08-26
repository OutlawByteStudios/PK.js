import { gql } from 'apollo-boost';

export default gql`
  query ServerStatsGraphLite($serverID: Int!, $startDate: Date, $stopDate: Date){
    server(id: $serverID){
      _id
      
      serverStatsLite(startDate: $startDate, stopDate: $stopDate){
        _id
        date
    
        playerCount
      }
    }
  }
`;
