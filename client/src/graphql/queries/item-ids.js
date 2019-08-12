import { gql } from 'apollo-boost';

export default gql`
  query {
    items {
      id
      name
    }
  }
`;
