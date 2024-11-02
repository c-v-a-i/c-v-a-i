const reactHooks = require('eslint-plugin-react-hooks');
const lodash = require('eslint-plugin-lodash');
const unusedImports = require('eslint-plugin-unused-imports');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const importPlugin = require('eslint-plugin-import');
const typescriptParser = require('@typescript-eslint/parser');

const eslintrc = [
  {
    plugins: {
      'react-hooks': reactHooks,
      lodash,
      'unused-imports': unusedImports,
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
      },
    },
    rules: {
      // React hooks rules
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',

      '@typescript-eslint/no-explicit-any': 'error',
      // Lodash rules
      'lodash/import-scope': ['error', 'method'],

      // Unused imports rule
      'unused-imports/no-unused-imports': 'error',

      // TypeScript-specific rules
      '@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: false }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { args: 'after-used', ignoreRestSiblings: true, vars: 'all' }],
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        { ignoreConditionalTests: true, ignoreMixedLogicalExpressions: true },
      ],
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],

      // Import rules
      'import/no-duplicates': 'error',
      'import/order': 'error',

      // General rules
      'no-console': ['warn', { allow: ['error', 'debug'] }],
      'prefer-const': 'error',
      'spaced-comment': 'error',
    },
    files: [
        '**/*.{ts,tsx}',
        '!**/react-app-env.d.ts',
        '!**/graphql.tsx',
        '!**/generated/*'
    ],

  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: true,
      },
    },

    rules: {
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
];

module.exports = eslintrc;
