import { gql } from 'apollo-boost';

export default gql`
  query ServerConfigs($serverID: Int!){
    server(id: $serverID){
      _id
      
      serverConfigFiles {
        name
      }
    }
  }
`;
