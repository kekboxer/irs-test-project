const {Router} = require('express');
const bcrypt = require('bcryptjs');
const models = require('../app');
const router = Router();

router.post('/register', async (req, res) => {
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

module.exports = router;