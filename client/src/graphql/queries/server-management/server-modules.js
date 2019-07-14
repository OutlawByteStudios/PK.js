import { gql } from 'apollo-boost';

export default gql`
  query ServerModules($serverID: Int!, $steamID: String!){
    server(id: $serverID){
      _id
      
      modules
    }
    
    adminPermission(serverID: $serverID, steamID: $steamID){
      viewServerFiles
    }
  }
`;
