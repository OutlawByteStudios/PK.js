import { gql } from 'apollo-boost';

export default gql`
  query ServerController($serverID: Int!){
    server(id: $serverID){
      _id
      
      gameserverOnline
      gameserverLastModule
      gameserverLastConfig
    }
  }
`;
