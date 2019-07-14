import { gql } from 'apollo-server-koa';

export default gql`
  directive @fieldViewPermission(
    requiresAdminPermission: String
    viewIfPlayer: Boolean
    viewIfAdmin: Boolean
  ) on OBJECT | FIELD_DEFINITION
`;
