const LocalStrategy = require('passport-local').Strategy;
const models = require('../app');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            models.User.findOne({ username: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
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
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        models.User.findByPk(id, function(err, user) {
            done(err, user);
        });
    });
}
