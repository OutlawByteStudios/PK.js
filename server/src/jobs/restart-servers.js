import { Server } from '../models';
import {
  restartServer,
  isServerOnline
} from '../utils/gameserver-instance-tools';

export default async function() {
  const servers = await Server.find();

  let jobs = [];
  for (let server of servers) {
    jobs.push({
      id: `restart-server-${server.id}`,
      cron: server.gameserverRestartCron,
      func: async () => {
        console.log(
          `Checking if restarted need for instance for server: ${server.id}`
        );
        if (await isServerOnline(server.id)) {
          console.log(`Restarting server instance for server: ${server.id}`);
          await restartServer(server.id);
        }
      }
    });
  }

  return jobs;
}
