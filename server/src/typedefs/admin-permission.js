import { gql } from 'apollo-server-koa';

export default gql`
  type AdminPermission {
    server: Server
    admin: SteamUser
    player: Player
    
    manageAdminAssignPermissions: Boolean
    hasViewAdminPermissions: Boolean
    assignViewAdminPermissions: Boolean
  }
`;
