module.exports = {
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended'
  ],
  overrides: [
    {
      files: ['*.spec.js'],
      rules: {
        'no-unused-expressions': 0
      },
      globals: {
        afterAll: true,
        beforeAll: true,
        describe: true,
        expect: true,
        it: true,
        jest: true
      }
    }
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react-hooks'],
  rules: {
    semi: ['error', 'never'],
    'no-console': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
