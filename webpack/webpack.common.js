const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: ["@babel/polyfill", "./packages/index.js"],
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      title: "Aykut Simsek",
      filename: path.resolve(__dirname, '../index.html'),
      // template: path.resolve(__dirname, '../index.html'),
      inject: "head",
      scriptLoading: "defer",
    }),
    new webpack.ProgressPlugin(),
    new ESLintPlugin({
        overrideConfigFile: path.resolve(__dirname, '..', '.eslintrc.js'),
        context: path.resolve(__dirname, '../src'),
        files: ['**/*.js',"**/*.jsx"],
        extensions: [".js", ".jsx"]
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  output: {
    path: path.resolve(__dirname, '../public', 'build'),
    // filename: "[name].bundle.js",
    filename: 'bundle.js',
    // Everything related to Webpack should go through a build path,
    // localhost:3000/build. That makes proxying easier to handle
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(css|scss)$/i,
        use: ['style-loader','css-loader','sass-loader'],
      },
      {
       test: /\.(ttf|eot|svg|gif|jpg|png|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@root': path.resolve(__dirname, '..'),
      '@public': path.resolve(__dirname, '../public'),
      '@packages': path.resolve(__dirname, '../packages'),
      '@db': path.resolve(__dirname, '../db'),
      '@server': path.resolve(__dirname, '../server'),
      'babel-runtime': path.resolve(__dirname, '../node_modules/babel-runtime'),
      react: path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
      lodash: path.resolve(__dirname, '../node_modules/lodash'),
      leaflet: path.resolve(__dirname, '../public/vendor/leaflet/leaflet-src.js'),
    },
    // ... rest of the resolve config
    fallback: {
      "path": require.resolve("path-browserify")
    }
  },
};
