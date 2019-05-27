import { gql } from 'apollo-boost';

export default gql`
  fragment Item on Item {
    _id
    
    id
    name  
  }
`;
