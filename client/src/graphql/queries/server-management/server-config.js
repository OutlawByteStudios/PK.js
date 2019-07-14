import { gql } from 'apollo-boost';

export default gql`
  query ServerConfigs($serverID: Int!, $steamID: String!, $name: String!){
    server(id: $serverID){
      _id
      id
      
      serverConfigFile(name: $name){
        name
        config
      }
    }
    
    adminPermission(serverID: $serverID, steamID: $steamID){
      viewServerFiles
    }
  }
`;
