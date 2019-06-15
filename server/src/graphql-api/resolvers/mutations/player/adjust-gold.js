import { AdminPermission, Player } from '../../../../models';

export default async (parent, args, context) => {
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const requestingAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: context.user
  });
  if (requestingAdmin === null)
    throw new Error('You do not have permission to do that.');

  const player = await Player.findOne({
    server: args.serverID,
    name: args.name
  });
  if (player === null) throw new Error('Player not found.');

  player[args.pouch === true ? 'pouchGold' : 'bankGold'] += args.amount * (args.remove !== true ? 1 : -1);

  player.pouchGold = Math.max(player.pouchGold, 0);

  await player.save();
  return player;
};
