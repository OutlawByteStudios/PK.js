import { Server } from '../../../models';

export default {
  Query: {
    server: async (parent, filter) => {
      return Server.findOne({ id: filter.id });
    },

    servers: async () => {
      return Server.find();
    }
  },

  Player: {
    server: async parent => {
      return Server.findOne({ id: parent.server });
    }
  },

  IPRecord: {
    server: async parent => {
      return Server.findOne({ id: parent.server });
    }
  },

  AdminLog: {
    server: async parent => {
      return Server.findOne({ id: parent.server });
    }
  },

  AdminPermission: {
    server: async parent => {
      return Server.findOne({ id: parent.server });
    }
  },

  ServerStats: {
    server: async parent => {
      return Server.findOne({ id: parent.server });
    }
  }
};
