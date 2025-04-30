'use client';

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // backend GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
