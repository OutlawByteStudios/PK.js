import { scheduleJob } from 'node-schedule';

import updateBanLists from './update-bans-list';

export default () => ({
  updateBanLists: scheduleJob('*/1 * * * *', updateBanLists)
});