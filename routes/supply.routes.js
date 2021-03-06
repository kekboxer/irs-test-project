const sequelize = require("sequelize");
const {Op} = require("sequelize");
const {Router} = require('express');
const models = require('../app').models;
const router = Router();
const passport = require('../app').passport;

const mustAuthenticatedMw = (req, res, next) => {
    req.isAuthenticated()
        ? next()
        : res.status(401).json({message: "Unauthorized"});
};

router.get('/subjects', mustAuthenticatedMw, async (req, res, next) => {
    try {
        const dbData = await models.R1022.findAll({
            where: {
                [Op.and]: [
                    sequelize.where(sequelize.fn('char_length', sequelize.col('p00')), 10),
                    {
                        p00: {
                            [Op.regexp]: '^(0|13)'
                        }
                    }
                ]
            }
        })
        const dataDTO = dbData.map((item) => {
            return {
                p00: item.p00,
                p01: item.p01
            }
        })
        await res.send(dataDTO);
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
});

router.get('/subjects/:p00/organizations', mustAuthenticatedMw, async (req, res, next) => {
    try {
        const organizations = await models.Mpe1gem.findAll({where: {r1022: req.params.p00}});
        await res.send(organizations)
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
})

router.post('/subjects/:poo/organizations', mustAuthenticatedMw, async (req, res, next) => {
    try {
        const data = {...req.body}
        const newOrganization = await models.Mpe1gem.create({...data});
        await res.send({id: newOrganization.id})
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
})

router.delete('/subjects/:poo/organizations', mustAuthenticatedMw, async (req, res, next) => {
    try {
        await models.Mpe1gem.destroy({where: {id: req.body}});
        res.send({message: 'Successful'})
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
})

router.put('/subjects/:poo/organizations', mustAuthenticatedMw, async (req, res, next) => {
    try {
        const organization = await models.Mpe1gem.findOne({where: { id: req.body.id }})
        organization[req.body.modified] = req.body.value;
        await organization.save();
        res.send({message: "Successful edited"})
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
})

module.exports = router;