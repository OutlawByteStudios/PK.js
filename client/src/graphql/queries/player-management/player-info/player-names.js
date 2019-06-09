import { gql } from 'apollo-boost';

export default gql`
  query PlayerNamees($serverID: Int!, $guid: String!){
    server(id: $serverID){
      _id
      
      player(guid: $guid){
        _id
        
        playerNames {
          _id
          name
          lastSeen
        }
      }
    }
  }
`;
