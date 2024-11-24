import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { toast } from 'react-toastify';
import { environment } from '../environment';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

const httpLink = new HttpLink({
  uri: environment.graphqlUrl,
  credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, extensions }) => {
      // @ts-expect-error - better types later
      if (extensions?.originalError?.statusCode !== 401) {
        toast(message, { type: 'error', theme: 'colored' });
      }
    });
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    const { message } = networkError;
    toast(message, { type: 'warning', theme: 'colored' });
  }
});

export const apolloClient = new ApolloClient({
  cache,
  link: from([errorLink, httpLink]),
  credentials: 'include',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-and-network',
    },
  },
});
