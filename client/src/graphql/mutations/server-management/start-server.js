import { gql } from 'apollo-boost';

export default gql`
  mutation StartServer($serverID: Int!, $module: String!, $config: String!){
    startServer(serverID: $serverID, module: $module, config: $config){
      _id
      
      gameserverOnline
      gameserverLastModule
      gameserverLastConfig
    }
  }
`;
