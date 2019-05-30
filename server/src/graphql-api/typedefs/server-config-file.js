import { gql } from 'apollo-server-koa';

export default gql`
  type ServerConfigFile {
    name: String
    config: String
    rawConfig: String
  }
`;
