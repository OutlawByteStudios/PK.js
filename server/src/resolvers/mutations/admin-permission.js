import {
  UserInputError
} from 'apollo-server-koa';

import {
  AdminPermission,
  SteamUser
} from '../../models';

import { panelPermissions } from 'shared';

export default {
  Mutation: {

    addAdminPermission: async (parent, args, context) => {
      if(context.user === null) throw new Error('You must be logged in to complete this action.');
      const requestingAdmin = await AdminPermission.findOne({
        server: args.serverID,
        admin: context.user
      });

      let allowed = false;
      for(let permission of panelPermissions) {
        if (requestingAdmin[permission.assign])
          allowed = true;
      }

      if(!allowed) throw new Error('You do not have permission to do that.');


      const user = await SteamUser.findOne({
        steamID: args.steamID
      });

      if(user ===  null) throw new UserInputError('Unknown Steam ID. Please ensure they have logged in first.');

      return AdminPermission.findOneAndUpdate({
        server: args.serverID,
        admin: args.steamID
      }, {
        server: args.serverID,
        admin: args.steamID
      }, {
        upsert: true,
        setDefaultsOnInsert: true,
        new: true
      });
    },

    removeAdminPermission: async (parent, args, context) => {
      if(context.user === null) throw new Error('You must be logged in to complete this action.');
      const requestingAdmin = await AdminPermission.findOne({
        server: args.serverID,
        admin: context.user
      });

      if(requestingAdmin === null) throw new Error('You do not have permission to do that.');

      const targetAdmin = await AdminPermission.findOne({
        server: args.serverID,
        admin: args.steamID
      });

      if(targetAdmin === null) throw new Error('Admin not found.');

      for(let permission of panelPermissions) {
        if (targetAdmin[permission.has] && !requestingAdmin[permission.assign])
          throw new Error('You do not have permission to do that.');
      }

      await targetAdmin.delete();

      return targetAdmin;
    }
  }
}