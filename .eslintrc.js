module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'prettier'],
  extends: ['airbnb', 'prettier'],
  rules: {
    'react/forbid-prop-types': ['error', { forbid: ['object', 'array'] }],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': ['error'],
  },
  settings: {
    'import/resolver': 'webpack',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
};
