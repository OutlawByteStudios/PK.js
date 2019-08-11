import { Server, Player, PlayerStats } from '../models';

const recordStats = async player => {
  const lastRecord = await PlayerStats.findOne({
    server: player.server,
    player: player.guid
  }).sort({ date: -1 });

  if (
    lastRecord !== null &&
    lastRecord.totalGold === player.bankGold + player.pouchGold
  )
    return;

  await PlayerStats.create(
    [
      {
        server: player.server,
        player: player.guid,
        totalGold: player.bankGold + player.pouchGold
      }
    ],
    {
      setDefaultsOnInsert: true
    }
  );
};

export default async () => {
  console.log('Recording Player Stats...');

  let servers = await Server.find({
    recordStats: true
  });

  servers = servers.map(server => server.id);

  const players = await Player.find({
    server: { $in: servers }
  });

  players.forEach(recordStats);
};
