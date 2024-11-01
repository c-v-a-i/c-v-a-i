import { FlatCompat } from '@eslint/eslintrc'
// @ts-expect-error - no types
import reactHooks from '@grncdr/eslint-plugin-react-hooks'
import type { Linter } from 'eslint'
// @ts-expect-error - no types
import lodash from 'eslint-plugin-lodash'
// @ts-expect-error - no types
import storybook from 'eslint-plugin-storybook'
// @ts-expect-error - no types
import unusedImports from 'eslint-plugin-unused-imports'


const common: Linter.FlatConfig[] = [
  {
    plugins: {
      '@grncdr/react-hooks': reactHooks,
      lodash,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    rules: {
      '@grncdr/react-hooks/exhaustive-deps': 'error',
      '@grncdr/react-hooks/rules-of-hooks': 'error',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal'],
        },
      ],
      'lodash/import-scope': ['error', 'method'],
      'unused-imports/no-unused-imports': 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': 'allow-with-description',
          'ts-nocheck': true,
          'ts-check': false,
        },
      ],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'as',
          objectLiteralTypeAssertions: 'allow',
        },
      ],
      '@typescript-eslint/consistent-type-exports': [
        'error',
        {
          fixMixedExportsWithInlineTypeSpecifier: false,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/lines-between-class-members': 'error',
      '@typescript-eslint/method-signature-style': 'off',
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: false,
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          ignoreRestSiblings: true,
          vars: 'all',
        },
      ],
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        {
          ignoreConditionalTests: true,
          ignoreMixedLogicalExpressions: true,
        },
      ],
      '@typescript-eslint/prefer-ts-expect-error': 'off',
      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/return-await': ['error', 'in-try-catch'],
      '@typescript-eslint/strict-boolean-expressions': 'off',
      'import/no-duplicates': 'error',
      'import/order': 'error',
      'no-console': ['warn', { allow: ['error', 'debug'] }],
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      'spaced-comment': 'error',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx'],
    rules: {
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  }
];

export const eslintrc: Linter.FlatConfig[] = [...common]
