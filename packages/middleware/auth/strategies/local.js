const LocalStrategy = require('passport-local').Strategy;

const knex = require('../../../../db/connection');
const authHelpers = require('../_helpers');

const options = {};

module.exports = new LocalStrategy(
  options,
  (username, password, done) => {
    // check to see if the username exists
    knex('users').where({ username }).first()
      .then((user) => {
        if (!user || !authHelpers.comparePass(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch(err => done(err));
  }
);
