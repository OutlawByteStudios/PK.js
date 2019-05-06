import { Server } from '../../models/index';

export default {
  Query: {
    server: async (parent, filter) => {
      return Server.findOne({ _id: filter.id });
    },

    servers: async () => {
      return Server.find();
    }
  },

  AdminPermission: {
    server: async parent => {
      return Server.findOne({ _id: parent.server });
    }
  }
};
