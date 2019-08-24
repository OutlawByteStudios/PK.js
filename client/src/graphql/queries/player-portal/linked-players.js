import { gql } from 'apollo-boost';

export default gql`
  query LinkedPlayers {
    linkedPlayers {
      _id
      guid
      
      server {
        _id
        id
        name
      }  
    }
  }
`;
