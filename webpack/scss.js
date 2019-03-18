const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cssnano = require('cssnano')
const precss = require('precss')
const { resolve } = require('path')

const isProd = process.env.NODE_ENV === 'production'

module.exports = () => ({
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? 'css/[name].[chunkhash:5].css' : 'css/[name].css',
      chunkFilename: isProd ? 'css/[name].[chunkhash:5].css' : 'css/[name].css',
      // filename: 'css/[name].css',
      // chunkFilename: 'css/[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(:?scss|css)$/i,
        include: resolve(__dirname, '../src'),
        use: [
          // MiniCssExtractPlugin
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' },
          },
          // process '@import' and 'url()' like `'require'
          {
            loader: 'css-loader',
            options: {
              // modules: true,
              sourceMap: !isProd,
              importLoaders: 1,
            },
          },
          // postcss
          {
            loader: 'postcss-loader',
            options: {
              // sourceMap: !isProd,
              // ident: 'postcss',
              plugins: [
                precss({
                  autoprefixer: { grid: true },
                  importPaths: ['src/styles'],
                }),
                // minify
                ...(!isProd
                  ? []
                  : [
                      cssnano({
                        preset: ['default'],
                      }),
                    ]),
              ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          test: m => m.constructor.name === 'CssModule',
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          minSize: 0,
        },
      },
    },
  },
})
