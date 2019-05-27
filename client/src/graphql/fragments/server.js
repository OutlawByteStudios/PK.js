import { gql } from 'apollo-boost';

export default gql`
  fragment Server on Server {
    _id
    
    id
    name  
  }
`;
