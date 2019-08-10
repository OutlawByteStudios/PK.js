import { ServerStats } from '../../../models';

export default {
  Server: {
    serverStats: async (parent, filter) => {
      let query = { server: parent.id };
      if (filter.stopDate || filter.stopDate) query.date = {};
      if (filter.startDate) query.date.$gte = filter.startDate;
      if (filter.stopDate) query.date.$lt = filter.stopDate;

      return ServerStats.find(query).sort({ date: 1 });
    }
  }
};
