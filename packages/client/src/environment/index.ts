// import {match} from "ts-pattern";
//
// const env = import.meta.env.VITE_HOST_ENV;
//
// const uri = match(env as 'development')
//   .with('development', () => 'http://localhost:4000/graphql')
//   .exhaustive();

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

export const environment = {
  apiUrl,
  graphqlUrl: `${apiUrl}/graphql`,
  openapiDocsUrl: `${apiUrl}/api-docs-json`,
};
