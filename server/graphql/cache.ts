import {InMemoryCache} from '@apollo/client';

export default (initialState: any) => {
  const cache = new InMemoryCache({
    typePolicies: { // Type policy map
      Query: {
        fields: { // Field policy map for the Product type
          session: {
            read() {
              return initialState;
            }
          }
        }
      }
    }
  })

  return cache
};