import { gql } from 'apollo-server-koa';

export default gql`
  type ServerConfigFile
    @fieldViewPermission(requiresAdminPermission: "viewServerFiles") {
    server: Int
    name: String
    config: String
    rawConfig: String
  }
`;
