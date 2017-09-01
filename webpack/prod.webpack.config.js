const webpack = require('webpack');
const path = require('path');

const base = require('./base.js');

const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = base.merge({
  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'cheap-module-source-map',

  entry: [
    // Our application
    path.resolve(__dirname, '../packages', 'index.js'),
  ],

  // We have to manually add the Hot Replacement plugin when running
  // from Node
  plugins: [
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new webpack.optimize.AggressiveMergingPlugin(), // Merge chunks

    new webpack.optimize.OccurrenceOrderPlugin(),

    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    //   debug: false,
    // }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false, // remove comments
      compress: {
        unused: true,
        dead_code: true, // big one--strip code that will never execute
        warnings: false, // good for prod apps so users can't peek behind curtain
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        drop_console: true, // strips console statements
        sequences: true,
        booleans: true,
        screw_ie8: true,
        keep_fnames: true,
      },
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      sourcemap: true,
    }),

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   filename: 'common.[hash].js',
    //   minChunks: (module, count) => count >= 3,
    // }),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|json)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),

    new BundleAnalyzerPlugin(),
  ],

});

module.exports = config;
