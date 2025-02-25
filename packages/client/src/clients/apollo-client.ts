import type { ApolloLink } from '@apollo/client';
import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { toast } from 'react-toastify';
import { environment } from '../environment';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

const uploadLink = createUploadLink({
  uri: environment.graphqlUrl,
  credentials: 'include',
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, extensions }) => {
      // @ts-expect-error - better types later
      if (extensions?.originalError?.statusCode !== 401) {
        toast(message, { type: 'error', theme: 'colored' });
        console.error('Encountered error: ', graphQLErrors);
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
  link: from([uploadLink as unknown as ApolloLink, errorLink]),
  credentials: 'include',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-and-network',
    },
  },
});
