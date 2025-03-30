import {match} from "ts-pattern";

const env = import.meta.env.VITE_HOST_ENV;

const apiUrl = match(env as 'development')
  .with('development', () => 'http://localhost:4000/graphql')
  .otherwise(() => 'cvai-env.eba-3vuhhsf7.eu-central-1.elasticbeanstalk.com')

export const environment = {
  apiUrl,
  graphqlUrl: `${apiUrl}/graphql`,
  openapiDocsUrl: `${apiUrl}/api-docs-json`,
};
