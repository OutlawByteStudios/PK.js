import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa';

import typeDefs from './typedefs';
import schemaDirectives from './directives';
import resolvers from './resolvers';

import jwt from 'jsonwebtoken';
import serverConfig from '../../server-config';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives
});

export default new ApolloServer({
  schema,
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
