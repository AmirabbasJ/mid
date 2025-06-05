import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...compat.config({
    rules: {
      'react/display-name': 'off',
      'no-restricted-imports': ['error'],
      'quotes': ['warn', 'single'],
      'semi': ['error', 'always'],
      'no-multi-str': 'error',
      'no-await-in-loop': 'error',
      'strict': ['error', 'never'],
      'no-iterator': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-else-return': 'error',
      'prefer-const': 'error',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      'no-redeclare': 'off',
    },
  }),
];

export default eslintConfig;
