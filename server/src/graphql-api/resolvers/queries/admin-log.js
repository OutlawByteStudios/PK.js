import { AdminLog } from '../../../models';

export default {
  Server: {
    adminLogs: async (parent, filter) => {
      let query = { server: parent.id };
      if(filter.admin) query.admin = filter.admin;
      return AdminLog.find(query);
    }
  },

  AdminPermission: {
    adminLogs: async parent => {
      return AdminLog.find({
        server: parent.server,
        admin: parent.admin
      })
    }
  }
};
