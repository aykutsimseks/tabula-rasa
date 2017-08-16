const passport = require('passport');

const facebook = require('./strategies/facebook');
const google = require('./strategies/google');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use('facebook', facebook);
passport.use('google', google);

module.exports = passport;
