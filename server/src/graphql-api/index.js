import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa';

import typeDefs from './typedefs';
import schemaDirectives from './directives';
import resolvers from './resolvers';

import jwt from 'jsonwebtoken';
import { AdminPermission, Player } from '../models';
import serverConfig from '../../server-config';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives
});

export default new ApolloServer({
  schema,
  context: async ({ ctx }) => {
    try {
      const user = jwt.verify(ctx.get('JWT'), serverConfig.jwtAuth.secret, {
        algorithms: [serverConfig.jwtAuth.algorithm]
      }).user.steamID;

      let adminPermissions = {};
      (await AdminPermission.find({ admin: user })).forEach(function(
        adminPermission
      ) {
        adminPermissions[adminPermission.server] = adminPermission;
      });

      let players = {};
      (await Player.find({ linkedSteamUser: user })).forEach(function(player) {
        players[`${player.server}-${player.guid}`] = player;
      });

      return {
        user,
        adminPermissions,
        players
      };
    } catch (err) {
      return {
        user: null,
        adminPermissions: {},
        players: {}
      };
    }
  }
});
