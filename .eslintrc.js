const path = require('path')

module.exports = {
  root: true,
  extends: ['airbnb-base', 'prettier'],
  env: {
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 'off',
    'no-useless-return': 'off',
    'no-param-reassign': ['error', { props: false }],

    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          './webpack/*.*',
          './webpack.config.js',
          './src/polyfills.js',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
  },
}
