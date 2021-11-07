module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  rules: {
    'no-plusplus': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': 0,
    'no-continue': 0,
    'no-param-reassign': 0,
    'no-bitwise': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    'func-names': 0,
    'no-console': 0,
    'no-await-in-loop': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-useless-constructor': 0,
    '@typescript-eslint/no-useless-constructor': ['error'],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
    },
    {
      files: '*.spec.js',
      rules: {
        'no-unused-expressions': 'off',
      },
    },
  ],
};
