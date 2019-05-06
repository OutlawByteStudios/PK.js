import { AdminPermission } from '../../models/index';

export default {
  Query: {
    adminPermission: async (parent, filter) => {
      return AdminPermission.find(filter);
    },

    adminPermissions: async () => {
      return AdminPermission.find();
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
