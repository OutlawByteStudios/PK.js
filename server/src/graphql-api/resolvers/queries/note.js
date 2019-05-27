import { Note } from '../../../models';

export default {
  Server: {
    notes: async (parent, filter) => {
      let query = { server: parent.id };

      if (filter.player) query.player = filter.player;

      return Note.find(query);
    }
  },

  Player: {
    notes: async (parent, filter) => {
      return Note.find({
        server: parent.server,
        player: parent.guid
      });
    }
  }
};
