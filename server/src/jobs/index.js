import { scheduleJob } from 'node-schedule';

import recordStats from './record-stats';
import restartServers from './restart-servers';
import updateBanLists from './update-bans-list';

class JobContainer {
  async initContainer() {
    this.addJob('recordStats', '*/5 * * * *', recordStats);
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
