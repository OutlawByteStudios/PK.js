import { AdminPermission, Player, Ban, AdminLog } from '../../../../models';

export default async (parent, args, context) => {
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const requestingAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: context.user,
    manageBans: { $gt: 0 }
  });
  if (requestingAdmin === null)
    throw new Error('You do not have permission to do that.');

  if (args.publicReason === '')
    throw new Error('Ban must have a public reason.');
  if (args.privateReason === '')
    throw new Error('Ban must have a private reason.');

  const player = await Player.findOne({
    server: args.serverID,
    guid: args.guid
  });

  if (player === null) throw new Error('Player not found.');

  const ban = new Ban({
    server: args.serverID,
    player: args.guid,
    admin: context.user,
    publicReason: args.publicReason,
    privateReason: args.privateReason,
    startDate: new Date(),
    endDate:
      args.length === -1
        ? null
        : new Date().setDate(new Date().getDate() + args.length),
    ipBan: !!args.ipBan
  });

  await ban.save();

  await new AdminLog({
    server: ban.server,
    admin: ban.admin,

    type: 'add_ban',
    targetPlayer: ban.player,
    reason: ban.privateReason,
    length: args.length,
    ipBanned: !!args.ipBan
  }).save();

  return ban;
};
