import { deleteServer } from '../../../../utils/server-folder-manager';
import jobContainer from '../../../../jobs';

import {
  SteamUser,
  Server,
  AdminLog,
  AdminPermission,
  Ban,
  IPRecord,
  Note,
  Player,
  PlayerName,
  PlayerStats,
  ServerStats,
  Warning
} from '../../../../models';
import gameserverStatusCache from '../../../../utils/gameserver-status-cache';

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

  if (await gameserverStatusCache.gameserverOnline(server.id))
    throw new Error('You cannot delete a server while it is running!');

  /* Delete all documents related to server */
  await Promise.all([
    Server.deleteOne({ id: server.id }),
    AdminLog.deleteMany({ server: server.id }),
    AdminPermission.deleteMany({ server: server.id }),
    Ban.deleteMany({ server: server.id }),
    IPRecord.deleteMany({ server: server.id }),
    Note.deleteMany({ server: server.id }),
    Player.deleteMany({ server: server.id }),
    PlayerName.deleteMany({ server: server.id }),
    PlayerStats.deleteMany({ server: server.id }),
    ServerStats.deleteMany({ server: server.id }),
    Warning.deleteMany({ server: server.id })
  ]);

  await deleteServer(server);

  jobContainer.deleteJob(`restart-server-${server.id}`);

  return server;
};
