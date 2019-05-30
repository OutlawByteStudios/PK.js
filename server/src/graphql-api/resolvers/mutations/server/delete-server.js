import fs from 'fs';
import path from 'path';
import del from 'del';

import {
  SteamUser,
  Server,
  AdminPermission,
  Player,
  PlayerName,
  Ban,
  Warning,
  Note
} from '../../../../models';

export default async (parent, args, context) => {
  /* Check for Permissions */
  if (context.user === null)
    throw new Error('You must be logged in to complete this action.');

  const requestingUser = await SteamUser.findOne({
    steamID: context.user,
    panelAdmin: true
  });

  if (requestingUser === null)
    throw new Error('You do not have permission to do that.');

  /* Get copy of server */
  const server = await Server.findOne({
    id: args.serverID
  });

  if (server === null) throw new Error('Server not found.');

  /* Delete all documents related to server */
  await Promise.all([
    Server.deleteOne({ id: server.id }),
    AdminPermission.deleteMany({ server: server.id }),
    Player.deleteMany({ server: server.id }),
    PlayerName.deleteMany({ server: server.id }),
    Ban.deleteMany({ server: server.id }),
    Warning.deleteMany({ server: server.id }),
    Note.deleteMany({ server: server.id })
  ]);

  /* Delete server folder */
  const currentGameserverPath = path.join(
    require.resolve('gameservers'),
    `../${server.id}`
  );
  if (!fs.existsSync(currentGameserverPath)) return server;
  await del([currentGameserverPath], { force: true });

  return server;
};
