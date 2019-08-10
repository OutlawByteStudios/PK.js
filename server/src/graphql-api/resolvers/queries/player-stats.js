import { PlayerStats } from '../../../models';

export default {
  Player: {
    playerStats: async (parent, filter) => {
      let query = { server: parent.server, player: parent.guid };
      if (filter.stopDate || filter.stopDate) query.date = {};
      if (filter.startDate) query.date.$gte = filter.startDate;
      if (filter.stopDate) query.date.$lt = filter.stopDate;

      return PlayerStats.find(query).sort({ date: 1 });
    }
  }
};
