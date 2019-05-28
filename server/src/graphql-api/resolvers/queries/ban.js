import { Ban } from '../../../models';

export default {
  Server: {
    bans: async (parent, filter) => {
      let query = { server: parent.id };

      if (filter.player) query.player = filter.player;

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
