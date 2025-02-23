import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: ['http://localhost:4000/graphql', 'connection-directive.graphql'],
  documents: 'src/**/graphql/{queries,mutations,fragments}/index.graphql',
  generates: {
    'schema.graphql': {
      // preset: "client",
      plugins: ['schema-ast'],
    },
    'src/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        declarationKind: 'type',
        preResolveTypes: true,
        withHooks: true,
        withComponent: true,
        withRefetchFn: true,
        dedupeOperationSuffix: true,
        reactApolloVersion: 3,
        // apolloReactHooksImportFrom: '../graphql/customGqlHooks',
        apolloReactComponentsImportFrom: '../graphql/customGqlComponents',
      },
      hooks: {
        afterAllFileWrite: ['prettier --write'],
      },
    },
  },
};

export default config;
