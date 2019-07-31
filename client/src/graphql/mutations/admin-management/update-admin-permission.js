import { gql } from 'apollo-boost';

import Fragments from '../../fragments/index';

import { panelPermissions, gamePermissions } from 'shared/constants';

const addPermissionsVars = () => {
  let permissions = '';
  for (let permission of panelPermissions.concat(gamePermissions)) {
    permissions += `$${permission.permission}: Int\n`;
  }
  return permissions;
};

const addPermissionsParams = () => {
  let permissions = '';
  for (let permission of panelPermissions.concat(gamePermissions)) {
    permissions += `${permission.permission}: $${permission.permission}\n`;
  }
  return permissions;
};

export default gql`
  mutation UpdateAdminPermission(
    $serverID: Int!
    $steamID: String!
    $guid: String
    ${addPermissionsVars()}
){
  updateAdminPermission(
    serverID: $serverID
    steamID: $steamID
    guid: $guid
    ${addPermissionsParams()}
  ) {
    admin {
      _id
      steamID
      displayName
      avatar
    }
    
    player {
      _id
      guid
    }
    
    ...AdminPermission
  }
}
  
  ${Fragments.AdminPermission}
`;
