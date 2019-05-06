import { gql } from "apollo-boost";

export default gql`
  query PlayerSelector($serverID: Int!, $search: String!){
    server(id: $serverID){ 
      players(guidLike: $search){
        guid
      }
      playerNames(nameLike: $search){
        name
        player {
          guid
        }
      }
    }
  }
`;