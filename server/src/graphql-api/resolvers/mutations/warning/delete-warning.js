import { AdminPermission, Warning, AdminLog } from '../../../../models';

export default async (parent, args, context) => {
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const warning = await Warning.findOne({
    _id: args.warningID
  });
  if (warning === null) throw new Error('Warning not found.');

  const requestingAdmin = await AdminPermission.findOne({
    server: warning.server,
    admin: context.user,
    deleteWarnings: { $gt: 0 }
  });
  if (requestingAdmin === null)
    throw new Error('You do not have permission to do that.');

  await warning.delete();

  await new AdminLog({
    server: warning.server,
    admin: context.user,

    type: 'delete_warning',
    targetPlayer: warning.player,
    reason: args.reason
  }).save();

  return warning;
};
