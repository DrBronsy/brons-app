import {ApolloClient, InMemoryCache} from '@apollo/client';

export const createApolloClient = (state: any, csrf: any = '') => {
  const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache().restore(state),
    connectToDevTools: true,
    headers: {
      'X-CSRF-Token': csrf
    }
  });
  return client;
}