const LocalStrategy = require('passport-local').Strategy;
const models = require('../app').models;
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
    passport.use(new LocalStrategy( {
            usernameField: 'email',
            passwordField: 'password'
        },
        function (username, password, done) {
            models.User.findOne({where: {email: username}})
                .then(user => {
                    if (!user) {
                        return done(null, false, {message: 'Incorrect username.'});
                    }
                    bcrypt.compare(password, user.password, (err, result) => {
                        if (err) {
                            return done(null, false, {message: 'Incorrect password.'});
                        }
                        if (result) {
                            return done(null, user);
                        } else {
                            return done(null, false);
                        }
                    });
                });
        }))


    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(async function(user, done) {
        done(null, user);
    });
}
