const Webpack = require('webpack');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./../webpack/webpack.dev.js');

module.exports = () => {
  // First we fire up Webpack an pass in the configuration we
  // created
  var bundleStart = null;
  const compiler = Webpack(webpackConfig);

  // We give notice in the terminal when it starts bundling and
  // set the time it started
  compiler.hooks.compile.tap('compile', () => {
    bundleStart = Date.now();
  });

  // We also give notice when it is done compiling, including the
  // time it took. Nice to have
  compiler.hooks.done.tap('done', () => {
    console.log(`\n\nBundled in ${(Date.now() - bundleStart) / 1000}s!\n\n`);
  });

  const bundler = new WebpackDevServer(compiler, {
    compress: true,

    contentBase: path.resolve(__dirname, '../public', 'build'),

    progress: true,

    // We need to tell Webpack to serve our bundled application
    // from the build path. When proxying:
    // http://localhost:3000/build -> http://localhost:8080/build
    publicPath: '/build/',

    historyApiFallback: true,

    // Configure hot replacement
    hot: true,

    // The rest is terminal configurations
    quiet: false,
    noInfo: true,
    stats: {
      colors: true,
    },
  });

  // We fire up the development server and give notice in the terminal
  // that we are starting the initial bundle
  bundler.listen(8080, 'localhost', () => {
    console.log('\n\nBundling project, please wait...\n\n');
  });
};
