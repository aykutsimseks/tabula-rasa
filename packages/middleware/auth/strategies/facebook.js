const FacebookStrategy = require('passport-facebook').Strategy;

const knex = require('../../../../db/connection');

const options = {
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: process.env.FB_CALLBACK_URL,
  profileFields: ['id', 'name', 'displayName', 'email']
};

const createUser = profile =>
  knex('users')
    .insert({
      email: profile.emails[0].value,
      display_name: profile.displayName,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      provider: 'facebook',
      profile: JSON.stringify(profile),
    })
    .returning('*');

module.exports = new FacebookStrategy(options, (accessToken, refreshToken, profile, done) => {
  console.log("HERE")
  knex('users')
    .where({ email: profile.emails[0].value })
    .first()
    .then((user) => {
      if (!user) {
        return createUser(profile)
          .then(() => done(null, user));
      }
      return done(null, user);
    })
    .catch(err => done(err));
});
