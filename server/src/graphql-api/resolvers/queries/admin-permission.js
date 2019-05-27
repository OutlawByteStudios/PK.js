import { AdminPermission } from '../../../models';

export default {
  Query: {
    adminPermission: async (parent, filter) => {
      return AdminPermission.findOne({
        server: filter.serverID,
        admin: filter.steamID
      });
    },

    adminPermissions: async (parent, filter) => {
      return AdminPermission.find({
        $or: [
          { server: filter.serverID },
          { admin: filter.steamID }
        ]
      });
    }
  },

  Server: {
    adminPermission: async (parent, filter) => {
      return AdminPermission.findOne({
        server: parent.id,
        admin: filter.steamID
      });
    },

    adminPermissions: async parent => {
      return AdminPermission.find({
        server: parent.id
      });
    }
  }
};