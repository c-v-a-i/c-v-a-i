import {match} from "ts-pattern";
import {ApolloClient, from, HttpLink, InMemoryCache} from "@apollo/client";
import {onError} from "@apollo/client/link/error";
import {toast} from "react-toastify";

const env = import.meta.env.VITE_HOST_ENV;

const uri = match(env as 'development')
    .with('development', () => 'http://localhost:4000/graphql')
    .exhaustive()

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
      },
    },
  },
});

const httpLink = new HttpLink({
  uri
})

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, response }) => {
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
  },
);

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
