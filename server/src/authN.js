
'use strict';
var passport = require('passport');
var LdapStrategy = require('passport-ldapauth');

passport.use(new LdapStrategy({
  server: {
    url: 'ldaps://localhost:636',
    searchBase: 'ou=people,ou=pg,o=world',
    searchFilter: '(extShortName={{username}})'
  }
}));

var user = {};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});

module.exports = passport;