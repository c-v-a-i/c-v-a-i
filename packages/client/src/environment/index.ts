import {match} from "ts-pattern";

const env = import.meta.env.VITE_HOST_ENV;

const apiUrl = match(env as 'development')
  .with('development', () => 'http://localhost:4000/graphql')
  .otherwise(() => 'https://api.arstoien.org/graphql')

export const environment = {
  apiUrl,
  graphqlUrl: `${apiUrl}/graphql`,
  openapiDocsUrl: `${apiUrl}/api-docs-json`,
};
