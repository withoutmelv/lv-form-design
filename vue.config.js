const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  configureWebpack: {
    output: {
      libraryExport: 'default'
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('packages'))
      .set('@components', resolve('packages/components'))
      .set('@utils', resolve('packages/utils'))
      .set('@mixins', resolve('packages/mixins'))

    const output = config.output.store.get('path')
    if (output.includes('lib')) config.plugin('optimize')
      .use(webpack.optimize.LimitChunkCountPlugin, [{
        maxChunks: 1
      }])
  },
  devServer: {
    open: true
  },

  css: {
    extract: false
  }
})
