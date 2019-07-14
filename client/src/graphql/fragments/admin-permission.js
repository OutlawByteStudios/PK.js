import { gql } from 'apollo-boost';

import { gamePermissions, panelPermissions } from "shared/constants";

const addPermissions = () => {
  let permissions = '';
  for (let permission of panelPermissions.concat(gamePermissions)) {
    permissions += `${permission.permission}\n`;
  }
  return permissions;
};


export default gql`
  fragment AdminPermission on AdminPermission {
    _id
  
   ${addPermissions()}
  }
`;
