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

  // get all active bans
  const activeBans = await Ban.find({
    $or: [
      {
        server: server.id,
        unbannedDate: null,
        startDate: { $lte: Date.now() },
        endDate: null
      },
      {
        server: server.id,
        unbannedDate: null,
        startDate: { $lte: Date.now() },
        endDate: { $gt: Date.now() }
      }
    ]
  });

  // split bans into array of banned guids and array of ip banned guids
  let bannedGUIDs = [];
  let ipBannedGUIDs = [];
  activeBans.forEach(ban => {
    if (ban.ipBan) ipBannedGUIDs.push(ban.player);
    bannedGUIDs.push(ban.player);
  });

  // get guids that are victims of an ip ban
  const ipBannedVictims = await IPRecord.distinct('player', {
    server: server.id,
    ip: {
      $in: await IPRecord.distinct('ip', {
        player: { $in: ipBannedGUIDs },
        server: server.id
      })
    }
  });

  ipBannedVictims.forEach(player => {
    if (!bannedGUIDs.includes(player)) bannedGUIDs.push(player);
  });

  fs.writeFileSync(banListFile, bannedGUIDs.join('\r\n'), 'utf8');
}

export default async () => {
  console.log('Updating Ban Lists...');
  const servers = await Server.find();
  servers.forEach(updateBanList);
};
