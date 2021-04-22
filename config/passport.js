const LocalStrategy = require('passport-local').Strategy;
const models = require('../app').models;
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
    passport.use(new LocalStrategy( {
            usernameField: 'email',
            passwordField: 'password'
        },
        async function (username, password, done) {
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
        done(null, user.id);
    });

    passport.deserializeUser(async function(id, done) {
        console.log("SERE")
        await models.User.findByPk(id)
            .then(user => {
                console.log("------")
                console.log(user)
                console.log("------")
                done(null, user);
            })
    });
}
