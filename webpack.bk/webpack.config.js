const webpack = require('webpack');
const path = require('path');

const base = require('./base.js');

const CompressionPlugin = require('compression-webpack-plugin');

const config = base.merge({
  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'eval',

  entry: [
    'react-hot-loader/patch',

    // For hot style updates
    'webpack/hot/dev-server',

    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',

    // Our application
    path.resolve(__dirname, '../packages', 'index.js'),
  ],

  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|json)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],

});

module.exports = config;
