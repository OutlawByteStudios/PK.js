import { AdminPermission, Player } from '../../../../models/index';

export default async (parent, args, context) => {
  /* Check for Permissions */
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const requestingAdmin = await AdminPermission.findOne({
    server: args.serverID,
    admin: context.user,
    clearPlayerLocations: { $gt: 0 }
  });

  if (requestingAdmin === null)
    throw new Error('You do not have permission to do that.');

  await Player.updateMany(
    {
      server: args.serverID
    },
    {
      $unset: {
        xPosition: 1,
        yPosition: 1,
        zPosition: 1
      }
    }
  );

  return Player.find({
    server: args.serverID
  });
};
