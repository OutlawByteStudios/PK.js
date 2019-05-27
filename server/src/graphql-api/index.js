import { ApolloServer } from 'apollo-server-koa';

import typeDefs from './typedefs';
import resolvers from './resolvers';

import jwt from 'jsonwebtoken';
import serverConfig from '../../server-config';

export default new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  context: ({ ctx }) => {
    try {
      return {
        user: jwt.verify(ctx.get('JWT'), serverConfig.jwtAuth.secret, {
          algorithms: [serverConfig.jwtAuth.algorithm]
        }).user.steamID
      };
    } catch (err) {
      return {
        user: null
      };
    }
  }
});