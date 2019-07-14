import { gql } from 'apollo-boost';

export default gql`
  query ServerConfigs($serverID: Int!, $steamID: String!){
    server(id: $serverID){
      _id
      
      serverConfigFiles {
        name
      }
    }
    
    adminPermission(serverID: $serverID, steamID: $steamID){
      viewServerFiles
    }
  }
`;
