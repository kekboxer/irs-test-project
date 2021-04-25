const {Router} = require('express');
const bcrypt = require('bcryptjs');
const models = require('../app').models;
const router = Router();
const passport = require('../app').passport;

router.post('/register', async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const alreadyRegistered = await models.User.findOne({where: {email: email}});
        if (alreadyRegistered) {
            return res.status(400).json({message: 'User already registered'});
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const user = await  models.User.create({email: email, password: hashPassword});

        await user.save(function(err) {
            return err
                ? next(err)
                : req.logIn(user, function(err) {
                    return err
                        ? next(err)
                        : res.redirect('/');
                });
        });
        res.status(201).json({message: 'User successful registered'});
    } catch (err) {
        res.status(500).json({message: 'Something went wrong'});
    }
})

router.post('/login', (req, res, next) => {
    try {
        passport.authenticate('local',
            function(err, user, info) {
                console.log("USER IN ROUTES", user)
                return err
                    ? next(err)
                    : user
                        ? req.logIn(user, function(err) {
                            return err
                                ? next(err)
                                : res.status(200).json({message: "Logged in"});
                        })
                        : res.redirect('/');
            }
        )(req, res, next);
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'Something went wrong'});
    }
})

router.get('/logout',(req, res) => {
    try {
        req.logout();
        res.status(200).json({message: "Logged out"});
    } catch (err) {
        res.status(500).json({message: 'Something went wrong'});
    }
})

router.get("/user", (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

module.exports = router;