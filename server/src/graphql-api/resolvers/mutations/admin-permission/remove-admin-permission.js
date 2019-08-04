import { AdminPermission, AdminLog } from '../../../../models';

import {
  assignPermissionCheck,
  gamePermissions,
  panelPermissions
} from 'shared/constants';

export default async (parent, args, context) => {
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');
  if (context.user === args.steamID)
    throw new Error('You cannot remove yourself.');

  const currentAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: context.user
  });
  if (currentAdmin === null)
    throw new Error('You do not have permission to do that.');

  const selectedAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: args.steamID
  });
  if (selectedAdmin === null) throw new Error('Admin not found.');

  // if the admin has the manageAssignPermissions permission, can this be removed?
  if (
    selectedAdmin.manageAssignPermissions > 0 &&
    !assignPermissionCheck(
      currentAdmin,
      selectedAdmin,
      'manageAssignPermissions'
    )
  )
    throw new Error('You do not have permission to do that.');

  for (let permission of panelPermissions.concat(gamePermissions)) {
    // we handled this permission already, so skip
    if (permission.permission === 'manageAssignPermissions') continue;

    // if they have the permission, check whether it can be removed
    if (
      selectedAdmin[permission.permission] > 0 &&
      !assignPermissionCheck(currentAdmin, selectedAdmin, permission.permission)
    )
      throw new Error('You do not have permission to do that.');
  }

  await selectedAdmin.delete();

  await new AdminLog({
    server: selectedAdmin.server,
    admin: currentAdmin.admin,

    type: 'remove_admin_permission',
    targetAdmin: selectedAdmin.admin
  }).save();

  return selectedAdmin;
};
