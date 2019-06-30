import { gql } from 'apollo-boost';

export default gql`
  mutation RestartServer($serverID: Int!){
    restartServer(serverID: $serverID){
      _id
      
      gameserverOnline
      gameserverLastModule
      gameserverLastConfig
    }
  }
`;
