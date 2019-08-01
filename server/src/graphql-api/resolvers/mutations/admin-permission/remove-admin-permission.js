import { AdminPermission, AdminLog } from '../../../../models';

import { gamePermissions, panelPermissions } from 'shared/constants';

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

  for (let permission of panelPermissions.concat(gamePermissions)) {
    if (selectedAdmin[permission] < 1) continue;

    if (
      (permission === 'manageAssignPermissions' &&
        currentAdmin.manageAssignPermissions < 2) ||
      (permission !== 'manageAssignPermissions' &&
        ((selectedAdmin[permission] < 2 &&
          currentAdmin[permission] < 2 &&
          currentAdmin.manageAssignPermissions < 1) ||
          (selectedAdmin[permission] > 1 &&
            (selectedAdmin.manageAssignPermissions > 0 ||
              currentAdmin.manageAssignPermissions < 1))))
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
