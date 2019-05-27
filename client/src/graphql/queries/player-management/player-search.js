import { gql } from 'apollo-boost';

export default gql`
  query PlayerSearch($serverID: Int!, $search: String!){
    server(id: $serverID){
      _id
      
      players(guidLike: $search){
        _id
        guid
      }
      
      playerNames(nameLike: $search){
        _id
        
        name
        
        player {
          guid
        }
      }
    }
  }
 
`;
