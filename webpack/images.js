const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')

const isProd = process.env.NODE_ENV === 'production'

module.exports = () => ({
  plugins: !isProd
    ? []
    : [
        new ImageminPlugin({
          test: /\.jpg$/i,
          plugins: [imageminMozjpeg({ quality: '80' })],
        }),
        new ImageminPlugin({
          test: /\.png$/i,
          pngquant: { quality: '85' },
        }),
      ],
  module: {
    rules: [
      {
        // test: /\.(jpe?g|png)$/,
        test: /\.(jpe?g|png)$/,
        include: /(?:blocks|layouts|pages)[\\/]+[^\\/]+[\\/]+.+$/,
        // include: resolve(__dirname, '../src'),
        exclude: /(?:blocks|layouts|pages)[\\/]+[^\\/]+[\\/]+sprite[\\/]+.+$/,
        loader: 'file-loader',
        options: {
          regExp: /(blocks|layouts|pages)[\\/]+([^\\/]+)[\\/]+(images[\\/]+)?(.+)\.(jpe?g|png)$/,
          name: '[1]/[2]/[4].[ext]',
          // name: '[path][name].[ext]',
          outputPath: 'images/',
        },
      },
    ],
  },
})
