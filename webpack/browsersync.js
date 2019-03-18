const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = () => ({
  plugins: [
    new BrowserSyncPlugin({
      port: 3000,
      server: { baseDir: ['dist'] },
      open: false,
      notify: false,
    }),
  ],
})
