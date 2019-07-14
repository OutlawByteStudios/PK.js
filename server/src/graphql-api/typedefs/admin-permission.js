import { gql } from 'apollo-server-koa';

import { panelPermissions, gamePermissions } from 'shared/constants';

const addPermissions = () => {
  let permissions = '';
  for (let permission of panelPermissions.concat(gamePermissions)) {
    permissions += `${permission.permission}: Int\n`;
  }
  return permissions;
};

export default gql`
  type AdminPermission {
    _id: String

    server: Server
    admin: SteamUser
    player: Player

    ${addPermissions()}

    adminLogs(
      filter: [String]
      page: Boolean
      startingAfter: String
      endingBefore: String
    ): [AdminLog] @fieldViewPermission(requiresAdminPermission: "viewAdminLogs")
  }
`;
