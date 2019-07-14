import { gql } from 'apollo-server-koa';

export default gql`
  type ServerConfigFile
    @fieldViewPermission(requiresAdminPermission: "viewServerFiles") {
    name: String
    config: String
    rawConfig: String
  }
`;
