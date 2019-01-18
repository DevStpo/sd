const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/api/*': {
        target: 'http://localhost:5000/',
        secure: 'false'
      }
    }
  },
  devtool: 'source-map'
})
