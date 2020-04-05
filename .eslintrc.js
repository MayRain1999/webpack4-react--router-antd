module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './webpack.config.dev.js',
      },
    },
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier/react',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'object-curly-newline': 'off',
    'arrow-body-style': 'off',
    'implicit-arrow-linebreak': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/prop-types': 'off',
  },
};
