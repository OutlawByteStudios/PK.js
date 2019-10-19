import { Ban } from '../../../models';

export default {
  Server: {
    bans: async (parent, filter) => {
      let query = { server: parent.id };

      if (filter.player) query.player = filter.player;

      if (filter.active && filter.active === true)
        query = {
          $or: [
            {
              ...query,
              unbannedDate: null,
              startDate: { $lte: Date.now() },
              endDate: null
            },
            {
              ...query,
              unbannedDate: null,
              startDate: { $lte: Date.now() },
              endDate: { $gt: Date.now() }
            }
          ]
        };

      return Ban.find(query);
    }
  },

  Player: {
    bans: async (parent, filter) => {
      return Ban.find({
        server: parent.server,
        player: parent.guid
      });
    }
  }
};
