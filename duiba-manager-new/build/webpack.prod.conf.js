var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env
var projectRoot = path.resolve(__dirname, '../')

var webpackConfig = merge(baseWebpackConfig, {
  profile: true,
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: '1024',
          name: '/newmanager/styles/images/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: '1024',
          name: './fonts/[name]_[hash:8].[ext]'
        }
      }
    ].concat(utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true }))
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: '/newmanager/scripts/[name].js',
    chunkFilename: '/newmanager/scripts/[name].js'
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin('/newmanager/styles/[name].css'),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'setting.html',
    //   template: 'setting.html',
    //   inject: true,
    //   minify: false,
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency',
    //   chunks: ['vendor', 'setting']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'datacenter.html',
    //   template: 'datacenter.html',
    //   minify: false,
    //   inject: true,
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency',
    //   chunks: ['vendor', 'datacenter']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'mobileui.html',
    //   template: 'mobileui.html',
    //   minify: false,
    //   inject: true,
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency',
    //   chunks: ['vendor', 'mobileui']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'goods.html',
    //   template: 'goods.html',
    //   minify: false,
    //   inject: true,
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency',
    //   chunks: ['vendor', 'goods']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'market.html',
    //   template: 'market.html',
    //   minify: false,
    //   inject: true,
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency',
    //   chunks: ['vendor', 'market']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'creditgame.html',
    //   template: 'creditgame.html',
    //   minify: false,
    //   inject: true,
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency',
    //   chunks: ['vendor', 'activity']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'orders.html',
    //   template: 'orders.html',
    //   minify: false,
    //   inject: true,
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency',
    //   chunks: ['vendor', 'orders']
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'account.html',
    //   template: 'account.html',
    //   minify: false,
    //   inject: true,
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency',
    //   chunks: ['vendor', 'account']
    // }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['vendor'],
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   chunks: ['vendor']
    // })
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
