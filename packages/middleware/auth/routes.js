const express = require('express');
const router = express.Router();

const authHelpers = require('../auth/_helpers');
const passport = require('passport');

const users = require('../../api/users');

// Local Register
router.post('/register', authHelpers.loginRedirect, (req, res, next) => {
  return users.createUser(req, res)
  .then((response) => {
    passport.authenticate('local', (err, user) => {
      if (user) { authHelpers.handleResponse(res, 200, 'success'); }
    })(req, res, next);
  })
  .catch((err) => { authHelpers.handleResponse(res, 500, 'error'); });
});

// Logout
router.get('/logout', authHelpers.loginRequired, (req, res, next) => {
  req.logout();
  req.session = null;
  res.redirect('/');
});

// Local Login
router.post('/login', authHelpers.loginRedirect, (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) { authHelpers.handleResponse(res, 500, 'error'); }
    if (!user) { authHelpers.handleResponse(res, 404, 'User not found'); }
    if (user) {
      req.logIn(user, (e) => {
        if (e) { authHelpers.handleResponse(res, 500, 'error'); }
        authHelpers.handleResponse(res, 200, 'success');
      });
    }
  })(req, res, next);
});

// Facebook Login
router.get('/login/facebook',
  passport.authenticate('facebook', {
    scope: [
      'email',
      'public_profile'
    ]
  })
);

router.get('/login/facebook/callback',
  passport.authenticate('facebook', {
    session: true,
    successRedirect: '/',
    failureRedirect: '/',
  })
);

// Google Login
router.get('/login/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile'
    ]
  })
);

// handle the callback after facebook has authenticated the user
router.get('/login/google/callback',
  passport.authenticate('google', {
    session: true,
    successRedirect: '/',
    failureRedirect: '/'
  })
);

module.exports = router;
