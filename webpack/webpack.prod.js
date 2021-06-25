const {merge} = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'cheap-module-source-map',
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: "style.[contenthash].css",
  //     chunkFilename: '[id].[contenthash].css'
  //   }),
  // ],
  // optimization: {
  //   moduleIds: "deterministic",
  //   runtimeChunk: "single",
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendors",
  //         chunks: "all",
  //       },
  //     },
  //   },
  // },
  entry: [
    // Our application
    path.resolve(__dirname, '../packages', 'index.js'),
  ],
  // output: {
  //   filename: "[name].[contenthash].js",
  // },
});
