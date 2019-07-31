import { gql } from 'apollo-boost';

export default gql`
  query ServerStatus($serverID: Int!, $steamID: String!, $searchString: String!){
    server(id: $serverID){
      _id
      
      logSearch(searchString: $searchString)
    }
    
    adminPermission(serverID: $serverID, steamID: $steamID){
      viewServerLogs
    }
  }
`;
