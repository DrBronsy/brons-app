import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

export let client: ApolloClient<any> | undefined;
export let cache: InMemoryCache | undefined;

function initApollo(csrf: string) {
  client = new ApolloClient({
    uri: '/graphql',
    cache,
    connectToDevTools: true,
    headers: {
      'X-CSRF-Token': csrf || ''
    }
  });
  return client;
}

export const createApolloClient = (state: any): ApolloClient<any> => {
  if (!client) {
    cache = new InMemoryCache().restore(state);
    const { session: { csrf } } = cache.readQuery({
      query: gql`
          query Session {
              session {
                  csrf
              }
          }
      `,
    });
    return initApollo(csrf)
  } else {
    return client
  }
}