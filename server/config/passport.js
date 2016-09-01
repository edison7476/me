// adding the module passport.js by referring to web sources
//dont know what it is for now, nut will find out
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Friend = mongoose.model('Friend');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    Friend.findOne({ email: username }, function (err, user) {
      // find a particular user corresponding to the email
    // if the user exists in out database then user will be return with its data
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));
