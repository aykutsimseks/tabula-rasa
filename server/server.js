const webpack = require('webpack');
const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
const app = express();
const compression = require('compression');

const passport = require('../packages/middleware/auth/passport');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

// Load Env Variables
require('../config.js');

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname, '..', 'public');

const api = require('../packages/api');
const authRoutes = require('../packages/middleware/auth/routes');

app.use(compression());

// We point to our static assets
app.use(express.static(publicPath, { maxAge: 86400000 }));

// We only want to run the workflow when not in production
if (!isProduction) {
  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  const bundle = require('./bundle.js');
  bundle();

  if (module.hot) module.hot.accept();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080',
    });
  });
}

// Passport
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1200000 },
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Auth routes
app.use('/auth(/v0)?', authRoutes);

// Import API Routes
app.use('/api(/v0)?', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'), { user: req.user });
});

app.use(express.static(publicPath, {
  extensions: ['gz'],
}));

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', () => {
  console.log('Could not connect to proxy, please try again...');
});

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// And run the server
const server = app.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }

  const address = server.address();
  console.log('🌎  Listening at http://%s:%s', address.address === '::' ? 'localhost' : address.address, address.port);
  return 0;
});
