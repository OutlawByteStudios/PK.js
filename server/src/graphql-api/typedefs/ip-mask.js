import { gql } from 'apollo-server-koa';

export default gql`
  type IPMask {
    _id: String
    id: Int
    ip: String
  }
`;
