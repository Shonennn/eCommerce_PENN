import express from 'express';
import cors from 'cors';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';

import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

const app = express();
const httpServer = http.createServer(app);

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use('/graphql', cors(), json(), expressMiddleware(server));
  httpServer.listen(4000, () => {
    console.log('🚀 Server ready at http://localhost:4000/graphql');
  });
}

startServer();
