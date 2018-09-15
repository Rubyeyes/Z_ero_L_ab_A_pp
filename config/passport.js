var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Admin = mongoose.model('Admin');

//passport local strategy
passport.use('userPassport', new localStrategy({usernameField: 'email'},
	function(username, password, done) {
		User.findOne({ email: username }, function (err, user) {
			if (err) {return done(err); }
			if (!user) {
				return done(null, false, {message: 'Incorrect email.'});
			}
			if (!user.validPassword(password)) {
				return done(null, false, {message: 'Incorrect password'});
			}
			return done(null, user);
		});
	}
));
passport.use('adminPassport', new localStrategy({ usernameField: 'email'},
	function(username, password, done) {
		Admin.findOne({ email: username }, function (err, admin) {
			if (err) {return done(err); }
			if (!admin) {
				return done(null, false, {message: 'Incorrect email.'});
			}
			if (!admin.validPassword(password)) {
				return done(null, false, {message: 'Incorrect password'});
			}
			return done(null, admin);
		});
	}
));