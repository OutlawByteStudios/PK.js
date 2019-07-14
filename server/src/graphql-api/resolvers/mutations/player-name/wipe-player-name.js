import { AdminPermission, PlayerName, AdminLog } from '../../../../models';

export default async (parent, args, context) => {
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const requestingAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: context.user,
    wipePlayerNames: { $gt: 0 }
  });
  if (requestingAdmin === null)
    throw new Error('You do not have permission to do that.');

  const playerName = await PlayerName.findOne({
    server: args.serverID,
    name: args.name
  });
  if (playerName === null) throw new Error('Player Name not found.');

  await playerName.delete();

  await new AdminLog({
    server: playerName.server,
    admin: context.user,

    type: 'wipe_player_name',
    targetPlayer: playerName.player,
    name: playerName.name
  }).save();

  return playerName;
};
