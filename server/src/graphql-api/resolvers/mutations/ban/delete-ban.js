import { AdminPermission, Ban, AdminLog } from '../../../../models';

export default async (parent, args, context) => {
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const ban = await Ban.findOne({
    _id: args.banID
  });
  if (ban === null) throw new Error('Ban not found.');

  const requestingAdmin = await AdminPermission.findOne({
    server: ban.server,
    admin: context.user,
    deleteBans: { $gt: 0 }
  });
  if (requestingAdmin === null)
    throw new Error('You do not have permission to do that.');

  await ban.delete();

  await new AdminLog({
    server: ban.server,
    admin: context.user,

    type: 'delete_ban',
    targetPlayer: ban.player,
    reason: args.reason
  }).save();

  return ban;
};
