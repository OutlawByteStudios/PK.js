import { AdminLog, AdminPermission, Player } from '../../../../models';

export default async (parent, args, context) => {
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const requestingAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: context.user,
    adjustGold: { $gt: 0 }
  });
  if (requestingAdmin === null)
    throw new Error('You do not have permission to do that.');

  const player = await Player.findOne({
    server: args.serverID,
    guid: args.guid
  });
  if (player === null) throw new Error('Player not found.');

  if (args.type === 'add') {
    player[args.pouch === true ? 'pouchGold' : 'bankGold'] += args.amount;
    await player.save();

    await new AdminLog({
      server: player.server,
      admin: context.user,

      type: 'adjust_gold',
      targetPlayer: player.guid,
      reason: args.reason,

      amount: args.amount,
      adjustmentType: 'add',
      from: args.pouch === true ? 'pouchGold' : 'bankGold'
    }).save();
  } else if (args.type === 'remove') {
    player[args.pouch === true ? 'pouchGold' : 'bankGold'] -= args.amount;
    if (args.pouch === true && player.pouchGold < 0)
      throw new Error("A player's pouch cannot go into a negative amount.");

    await player.save();

    await new AdminLog({
      server: player.server,
      admin: context.user,

      type: 'adjust_gold',
      targetPlayer: player.guid,
      reason: args.reason,

      amount: args.amount,
      adjustmentType: 'remove',
      from: args.pouch === true ? 'pouchGold' : 'bankGold'
    }).save();
  } else {
    const recipientPlayer = await Player.findOne({
      server: args.serverID,
      guid: args.recipient
    });

    if (recipientPlayer === null)
      throw new Error('Could not find recipient player.');

    if (recipientPlayer.guid === player.guid)
      throw new Error('Cannot transfer to the same player!');

    player.bankGold -= args.amount;
    await player.save();

    recipientPlayer.bankGold += args.amount;
    await recipientPlayer.save();

    await new AdminLog({
      server: player.server,
      admin: context.user,

      type: 'adjust_gold',
      targetPlayer: player.guid,
      reason: args.reason,

      amount: args.amount,
      adjustmentType: 'transfer',
      recipientPlayer: recipientPlayer.guid,
      from: 'bankGold'
    }).save();
  }

  return player;
};
