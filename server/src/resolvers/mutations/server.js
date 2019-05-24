import { UserInputError } from 'apollo-server-koa';

import { Server, AdminPermission, SteamUser } from '../../models';

import { panelPermissions, gamePermissions } from 'shared';

export default {
  Mutation: {
    createServer: async (parent, args, context) => {
      if (context.user === null)
        throw new Error('You must be logged in to complete this action.');

      const requestingUser = await SteamUser.findOne({
        steamID: context.user,
        panelAdmin: true
      });

      if (requestingUser === null)
        throw new Error('You do not have permission to do that.');

      if (args.name === '')
        throw new UserInputError('The server name cannot be blank.');

      let serverInput = {
        name: args.name
      };

      if (args.welcomeMessage) serverInput.welcomeMessage = args.welcomeMessage;

      let server = await Server.create([serverInput], {
        setDefaultsOnInsert: true
      });

      server = server[0];

      let adminPermission = {
        server: server._id,
        admin: context.user
      };

      for (let permission of panelPermissions.concat(gamePermissions)) {
        adminPermission[permission.permission] = 2;
      }

      await AdminPermission.create(adminPermission);

      return server;
    }
  }
};
