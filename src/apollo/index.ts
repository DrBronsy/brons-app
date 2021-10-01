import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

export const createApolloClient = (state: any) => {
  const cache = new InMemoryCache().restore(state);
  const { session } = cache.readQuery({
    query: gql`
        query Session {
            session {
                csrf
            }
        }
    `,
  });

  const client = new ApolloClient({
    uri: '/graphql',
    cache,
    connectToDevTools: true,
    headers: {
      'X-CSRF-Token': session.csrf || ''
    }
  });
  return client;
}