const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = () => ({
  plugins: [
    new CopyWebpackPlugin([
      'favicon.ico',
      'manifest.json',
      'robots.txt',
      'sitemap.xml',
      'images/*',
      // { from: 'folder/', to: 'folder/', dot: true },
    ]),
  ],
})
