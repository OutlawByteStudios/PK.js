import { AdminPermission, Note } from '../../../../models';

export default async (parent, args, context) => {
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const note = await Note.findOne({
    _id: args.noteID
  });
  if (note === null) throw new Error('Note not found.');

  const requestingAdmin = await AdminPermission.findOne({
    server: note.server,
    admin: context.user
  });
  if (requestingAdmin === null)
    throw new Error('You do not have permission to do that.');

  await note.delete();
  return note;
};
