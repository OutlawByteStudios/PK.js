import fs from 'fs';
import path from 'path';
import { Server, Ban } from '../models';

async function updateBanList(server){
  const currentGameserverPath = path.join(require.resolve('gameservers'), `../${server.id}`);
  if (!fs.existsSync(currentGameserverPath)) return;
  const banListFile = path.join(currentGameserverPath, '/bans.txt');

  const bannedPlayers = await Ban.distinct(
    'player',
    {
      $or: [
        {
          unbannedDate: null,
          startDate: { $lte : Date.now() },
          endDate: null
        },
        {
          unbannedDate: null,
          startDate: { $lte: Date.now() },
          endDate: { $gt: Date.now() }
        }
      ]
    }
  );

  fs.writeFileSync(banListFile, bannedPlayers.join('\r\n'), 'utf8');
}

export default async () => {
  const servers = await Server.find();
  servers.forEach(updateBanList);
  console.log('Updated Ban Lists');
};
