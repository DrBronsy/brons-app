import * as core from 'express-serve-static-core';
import { ApolloServer, gql }  from 'apollo-server-express';

import typeDefs from './schema'
import resolvers from './resolvers'

export default async (APP: core.Express) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  await server.start();

  server.applyMiddleware({
    app: APP,
    path: '/graphql'
  });
};