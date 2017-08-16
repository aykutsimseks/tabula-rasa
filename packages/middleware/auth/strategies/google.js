const GoogleStrategy = require('passport-google-oauth2').Strategy;

const knex = require('../../../../db/connection');

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

const createUser = profile =>
  knex('users')
    .insert({
      email: profile.email,
      display_name: profile.displayName,
      first_name: profile.name.givenName,
      last_name: profile.name.familyName,
      provider: 'google',
      profile: JSON.stringify(profile),
    })
    .returning('*');

module.exports = new GoogleStrategy(options, (request, accessToken, refreshToken, profile, done) => {
  knex('users')
    .where({ email: profile.email })
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
