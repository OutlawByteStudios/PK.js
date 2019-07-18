import fs from 'fs';
import path from 'path';
import { Server, Ban, IPRecord } from '../models';

async function updateBanList(server) {
  const currentGameserverPath = path.join(
    require.resolve('gameservers'),
    `../${server.id}`
  );
  if (!fs.existsSync(currentGameserverPath)) return;
  const banListFile = path.join(currentGameserverPath, '/bans.txt');

  let bannedPlayers = await Ban.distinct('player', {
    $or: [
      {
        unbannedDate: null,
        startDate: { $lte: Date.now() },
        endDate: null
      },
      {
        unbannedDate: null,
        startDate: { $lte: Date.now() },
        endDate: { $gt: Date.now() }
      }
    ]
  });

  const ipBannedPlayers = await Ban.distinct('player', {
    $or: [
      {
        unbannedDate: null,
        startDate: { $lte: Date.now() },
        endDate: null,
        ipBan: true
      },
      {
        unbannedDate: null,
        startDate: { $lte: Date.now() },
        endDate: { $gt: Date.now() },
        ipBan: true
      }
    ]
  });

  const bannedIPs = await IPRecord.distinct('ip', {
    player: { $in: ipBannedPlayers }
  });
  let ipBannedGUIDs = await IPRecord.distinct('player', {
    ip: { $in: bannedIPs }
  });

  ipBannedGUIDs.forEach(guid => {
    if (!bannedPlayers.includes(guid)) bannedPlayers.push(guid);
  });

  fs.writeFileSync(banListFile, bannedPlayers.join('\r\n'), 'utf8');
}

export default async () => {
  console.log('Updating Ban Lists...');
  const servers = await Server.find();
  servers.forEach(updateBanList);
};
