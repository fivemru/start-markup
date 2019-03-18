const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const RmJsTypeWebpackPlugin = require('./rm-jstype-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = (pages = {}) => ({
  plugins: [
    ...Object.entries(pages).map(([name, options]) => {
      const path = typeof options === 'object' ? options.path : options
      const { data = {} } = options
      return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: resolve(path, `${name}.pug`),
        chunks: ['boilerplate', 'polyfills', 'commons', name],
        data,
      })
    }),
    new RmJsTypeWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.pug$/i,
        include: resolve(__dirname, '../src'),
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: !isProd,
              context: resolve(__dirname, '../src'),
              root: resolve(__dirname, '../src'),
            },
          },
        ],
      },
    ],
  },
})
