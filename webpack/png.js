const ImageminPlugin = require('imagemin-webpack-plugin').default
// const ImageSpritePlugin = require('image-sprite-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = () => ({
  plugins: [
    // new ImageSpritePlugin({
    //   // commentOrigin: true,
    //   // compress: true,
    //   extensions: ['png'],
    //   // indent: '',
    //   // log: true,
    //   // outputPath: './images',
    //   // outputFilename: 'images/sprite.png',
    //   // padding: 10,
    // }),
    ...(!isProd
      ? []
      : [
          new ImageminPlugin({
            test: /sprite[\\/].+\.png$/i,
            pngquant: { quality: '80' },
          }),
        ]),
  ],
  module: {
    rules: [
      // fallback
      {
        test: /\.(jpe?g|png)$/,
        include: /(?:blocks|layouts|pages)[\\/]+[^\\/]+[\\/]+sprite[\\/]+.+$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: 'images/',
        },
      },
    ],
  },
})

/* 
Usage:
    put png files to "src/ ** /sprite/[name].png"

    *.sass:
        @import 'generated/png-sprite'
        ...
        .icon-dog
            +sprite($dog)

        //- where $dog = dog.png
*/
