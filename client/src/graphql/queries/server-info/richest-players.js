import { gql } from 'apollo-boost';

export default gql`
  query RichestPlayers($serverID: Int!){
    server(id: $serverID){
      _id
      
      richestPlayers {
        _id
        lastPlayerName
        bankGold
        lastSeen
      }
    }
  }
`;
