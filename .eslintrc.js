module.exports = {
  env: {
    browser: true,
    es2021: true,
    webextensions: true,
  },
  globals: {
    JSX: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'no-console': ['error', { allow: ['error'] }],
    'import/extensions': ['error', 'never', { svg: 'always' }],
    'react/jsx-props-no-spreading': ['off'],

    // specific typescript rules
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-shadow': 'off', // replaced by ts-eslint rule below
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        // always try to resolve types under `<root>@types` directory even
        // it doesn't contain any source code, like `@types/unist`

        // Choose from one of the "project" configs below or omit to use
        // <root>/tsconfig.json by default

        // use <root>/path/to/folder/tsconfig.json
        project: 'src',
      },
    },
  },
};
