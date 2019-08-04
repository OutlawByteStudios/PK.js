import { UserInputError } from 'apollo-server-koa';

import { AdminPermission, SteamUser, AdminLog } from '../../../../models';

import { gamePermissions, panelPermissions } from 'shared/constants';

export default async (parent, args, context) => {
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const currentAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: context.user
  });
  if (currentAdmin === null)
    throw new Error('You do not have permission to do that.');

  // if they do not have the manageAssignPermissions permission, do they have permission
  // to assign at least one other permission?
  if (currentAdmin.manageAssignPermissions < 1) {
    let allowed = false;
    for (let permission of panelPermissions.concat(gamePermissions)) {
      if (currentAdmin[permission.permission] > 1) allowed = true;
    }
    if (!allowed) throw new Error('You do not have permission to do that.');
  }

  const selectedAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: args.steamID
  });
  if (selectedAdmin !== null) throw new Error('User is already an admin.');

  const selectedUser = await SteamUser.findOne({
    steamID: args.steamID
  });

  if (selectedUser === null)
    throw new UserInputError(
      'Unknown Steam ID. Please ensure they have logged in first.'
    );

  await new AdminLog({
    server: args.serverID,
    admin: currentAdmin.admin,

    type: 'add_admin_permission',
    targetAdmin: args.steamID
  }).save();

  return AdminPermission.findOneAndUpdate(
    {
      server: args.serverID,
      admin: args.steamID
    },
    {
      server: args.serverID,
      admin: args.steamID
    },
    {
      upsert: true,
      setDefaultsOnInsert: true,
      new: true
    }
  );
};
