const { resolve } = require('path')

module.exports = () => ({
  module: {
    rules: [
      {
        test: /fonts[\\/].+\.(woff2?|ttf)$/i,
        include: resolve(__dirname, '../src'),
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
})
