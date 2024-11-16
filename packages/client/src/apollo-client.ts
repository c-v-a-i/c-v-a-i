import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { toast } from 'react-toastify';
import { environment } from './environment';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

const httpLink = new HttpLink({
  uri: environment.graphqlUrl,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, extensions }) => {
      // We don't want to show Unauth errors, so we will not spam user
      // They are handled in auth.provider
      // @ts-expect-error - better types later
      if (extensions?.response?.statusCode !== 401) {
        toast(message, { type: 'error', theme: 'colored' });
      }
    });
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    const { message } = networkError;
    toast(message, { type: 'warning', theme: 'colored' });
  }
});

export const client = new ApolloClient({
  cache,
  link: from([errorLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-and-network',
    },
  },
});
