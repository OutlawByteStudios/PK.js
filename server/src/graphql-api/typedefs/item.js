import { gql } from 'apollo-server-koa';

export default gql`
  type Item {
    id: Int
    name: String
    textID: String
  }
`;
