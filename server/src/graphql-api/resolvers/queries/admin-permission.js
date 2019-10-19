import { AdminPermission } from '../../../models';
import { panelPermissions, gamePermissions } from 'shared/constants';

const sortAdmins = admins => {
  admins = admins
    .map(admin => {
      admin = admin.toObject();

      let totalPermissions = 0;
      for (let permission of panelPermissions.concat(gamePermissions))
        totalPermissions += admin[permission.permission];

      return {
        ...admin,
        totalPermissions
      };
    })
    .sort((a, b) => {
      return b.totalPermissions - a.totalPermissions;
    });

  return admins;
};

export default {
  Query: {
    adminPermission: async (parent, filter) => {
      return AdminPermission.findOne({
        server: filter.serverID,
        admin: filter.steamID
      });
    },

    adminPermissions: async (parent, filter) => {
      let admins = await AdminPermission.find({
        $or: [{ server: filter.serverID }, { admin: filter.steamID }]
      });

      return sortAdmins(admins);
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
      let admins = await AdminPermission.find({
        server: parent.id
      });

      return sortAdmins(admins);
    }
  }
};
