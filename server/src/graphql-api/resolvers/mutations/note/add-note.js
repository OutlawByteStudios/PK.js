import { AdminPermission, Player, Note } from '../../../../models';

export default async (parent, args, context) => {
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const requestingAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: context.user
  });
  if (requestingAdmin === null)
    throw new Error('You do not have permission to do that.');

  if(args.publicReason === '') throw new Error('Note cannot be blank.');

  const player = await Player.findOne({
    server: args.serverID,
    guid: args.guid
  });

  if (player === null) throw new Error('Player not found.');

  const note = new Note({
    server: args.serverID,
    player: args.guid,
    admin: context.user,
    note: args.note,
    date: new Date()
  });

  await note.save();
  return note;
};
