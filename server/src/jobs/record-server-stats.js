import {
  Server,
  Player,
  IPRecord,
  AdminPermission,
  Ban,
  Warning,
  Note,
  ServerStats
} from '../models';

import gameserverStatusCache from '../utils/gameserver-status-cache';
import { assignPorts } from '../utils/server-config-parser';

const recordServerStats = async server => {
  const uniqueGUIDs = await Player.countDocuments({ server: server.id });
  const uniqueIPs = (await IPRecord.distinct('ip', { server: server.id }))
    .length;

  const adminCount = await AdminPermission.countDocuments({
    server: server.id
  });

  const totalBans = await Ban.countDocuments({ server: server.id });
  const totalWarnings = await Warning.countDocuments({ server: server.id });
  const totalNotes = await Note.countDocuments({ server: server.id });

  const status = await gameserverStatusCache.gameserverStatus(
    'localhost',
    assignPorts(server.id).port,
    server.id
  );
  const playerCount = status.NumberOfActivePlayers;
  const currentMap = status.MapName;

  const goldStats = await Player.aggregate([
    {
      $match: { server: server.id }
    },
    {
      $group: {
        _id: null,
        totalBankGold: {
          $sum: '$bankGold'
        },
        totalPouchGold: {
          $sum: '$pouchGold'
        }
      }
    },
    {
      $addFields: {
        totalGold: { $add: ['$totalBankGold', '$totalPouchGold'] }
      }
    }
  ]);

  const totalGold = goldStats.length === 0 ? 0 : goldStats[0].totalGold;
  const totalBankGold = goldStats.length === 0 ? 0 : goldStats[0].totalBankGold;
  const totalPouchGold =
    goldStats.length === 0 ? 0 : goldStats[0].totalPouchGold;

  const bankLimit = server.defaultBankLimit;

  await ServerStats.create(
    [
      {
        server: server.id,
        uniqueGUIDs,
        uniqueIPs,
        adminCount,
        totalBans,
        totalWarnings,
        totalNotes,
        playerCount,
        currentMap,
        totalGold,
        totalBankGold,
        totalPouchGold,
        bankLimit
      }
    ],
    {
      setDefaultsOnInsert: true
    }
  );
};

export default async () => {
  console.log('Recording Server Stats...');

  const servers = await Server.find({
    recordStats: true
  });

  servers.forEach(recordServerStats);
};
