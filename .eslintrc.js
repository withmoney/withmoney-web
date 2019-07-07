module.exports = {
  parser: 'babel-eslint',
  plugins: ['react', 'prettier'],
  extends: ['airbnb', 'prettier'],
  rules: {
    'import/no-named-as-default': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'react/forbid-prop-types': ['error', { forbid: ['object', 'array'] }],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/no-unsafe': 'error',
    'jsx-a11y/label-has-associated-control': [ 'error', {
      'required': {
        'some': [ 'nesting', 'id'  ]
      }
    }],
    'jsx-a11y/label-has-for': 'off',
    'prettier/prettier': ['error'],
  },
  settings: {
    'import/resolver': 'webpack',
  },
  env: {
    es6: true,
    jest: true,
    browser: true,
    node: true,
  },
};
