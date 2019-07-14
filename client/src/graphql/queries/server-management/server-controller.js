import { gql } from 'apollo-boost';

export default gql`
  query ServerController($serverID: Int!, $steamID: String!){
    server(id: $serverID){
      _id
      
      gameserverOnline
      gameserverLastModule
      gameserverLastConfig
    }
    
    adminPermission(serverID: $serverID, steamID: $steamID){
      viewServerFiles
    }
  }
`;
