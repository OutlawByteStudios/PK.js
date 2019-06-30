import { gql } from 'apollo-boost';

export default gql`
  mutation StopServer($serverID: Int!){
    stopServer(serverID: $serverID){
      _id
      
      gameserverOnline
      gameserverLastModule
      gameserverLastConfig
    }
  }
`;
