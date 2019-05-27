import { Warning } from '../../../models';

export default {
  Server: {
    warnings: async (parent, filter) => {
      let query = { server: parent.id };

      if (filter.player) query.player = filter.player;

      return Warning.find(query);
    }
  },

  Player: {
    warnings: async parent => {
      return Warning.find({
        server: parent.server,
        player: parent.guid
      });
    }
  }
};
