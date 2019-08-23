import { gql } from 'apollo-boost';

export default gql`
  query OnlinePlayers($serverID: Int!){
    server(id: $serverID){
      _id
      
      onlinePlayers {
        _id
        guid
        lastPlayerName
        lastSeen
      }
    }
  }
`;
