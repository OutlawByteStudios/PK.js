import { gql } from 'apollo-boost';

export default gql`
  query ServerConfigs($serverID: Int!, $name: String!){
    server(id: $serverID){
      _id
      id
      
      serverConfigFile(name: $name){
        name
        config
      }
    }
  }
`;
