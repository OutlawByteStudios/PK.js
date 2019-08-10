import { scheduleJob } from 'node-schedule';

import recordPlayerStats from './record-player-stats';
import recordServerStats from './record-server-stats';
import restartServers from './restart-servers';
import updateBanLists from './update-bans-list';

class JobContainer {
  async initContainer() {
    this.addJob('recordPlayerStats', '*/30 * * * *', recordPlayerStats);
    this.addJob('recordServerStats', '*/5 * * * *', recordServerStats);
    this.addJobs(await restartServers());
    this.addJob('updateBanList', '*/5 * * * *', updateBanLists);
  }

  addJob(id, cron, func) {
    this[id] = scheduleJob(cron, func);
  }

  addJobs(jobs) {
    jobs.forEach(job => this.addJob(job.id, job.cron, job.func));
  }

  deleteJob(id) {
    this[id].cancel();
    delete this[id];
  }
}

export default new JobContainer();
