import { AdminLog } from '../../../models';

export default {
  Server: {
    adminLogs: async (parent, filter) => {
      let query = { server: parent.id };

      if (filter.admin) query.admin = filter.admin;
      if (filter.filter) query.type = { $in: filter.filter };

      if (filter.page) {
        const adminLogs = await AdminLog.paginate(query, {
          sort: { _id: -1 },
          limit: 30,
          startingAfter: filter.startingAfter,
          endingBefore: filter.endingBefore
        });
        if (adminLogs.items.length > 0)
          adminLogs.items[0].hasMore = adminLogs.hasMore;
        return adminLogs.items;
      } else return AdminLog.find(query);
    }
  },

  AdminPermission: {
    adminLogs: async (parent, filter) => {
      let query = { server: parent.server, admin: parent.admin };

      if (filter.filter) query.type = { $in: filter.filter };

      if (filter.page) {
        const adminLogs = await AdminLog.paginate(query, {
          sort: { _id: -1 },
          limit: 30,
          startingAfter: filter.startingAfter,
          endingBefore: filter.endingBefore
        });
        if (adminLogs.items.length > 0)
          adminLogs.items[0].hasMore = adminLogs.hasMore;
        return adminLogs.items;
      } else return AdminLog.find(query);
    }
  }
};
