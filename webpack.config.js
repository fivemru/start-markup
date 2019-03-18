const { resolve } = require('path')
const merge = require('webpack-merge')
const js = require('./webpack/js')
const copy = require('./webpack/copy')
const scss = require('./webpack/scss')
const pug = require('./webpack/pug')
const fonts = require('./webpack/fonts')
const images = require('./webpack/images')
const png = require('./webpack/png')
const svg = require('./webpack/svg')
const browsersync = require('./webpack/browsersync')

// pages
const pages = require('./pages.config')

const isProd = process.env.NODE_ENV === 'production'

const common = merge.smart([
  {
    mode: isProd ? 'production' : 'development',
    devtool: !isProd ? 'source-maps' : 'none',
    stats: {
      timings: true,
      modules: true,
    },
    // entry
    entry: {
      polyfills: 'polyfills.js',
      ...Object.entries(pages).reduce((entries, [name, options]) => {
        const path = typeof options === 'object' ? options.path : options
        entries[name] = resolve(path, `${name}.js`)
        return entries
      }, {}),
    },
    output: {
      path: resolve(__dirname, 'dist'),
      filename: isProd ? 'js/[name].[chunkhash:5].js' : 'js/[name].js',
      pathinfo: false,
    },
    //
    context: resolve(__dirname, 'src'),
    resolve: {
      modules: [resolve(__dirname, 'src'), 'node_modules'],
    },
  },
  js(),
  scss(),
  pug(pages),
  fonts(),
  images(),
  png(),
  svg(),
  copy(),
])

let config = common
// start browsersync
if (process.env.START_SERVER === 'browsersync') {
  config = merge.smart([common, browsersync()])
}

module.exports = merge.smart(config)
