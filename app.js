const express = require('express');
const config = require('config');
const sequelize = require('sequelize');
const { Op } = require("sequelize");

// Database
const db = require('./config/database');

const app = express();

app.use('/api/auth', require('./routes/auth.routes'));

const PORT = config.get('port') || 5000;

const initModels = require('./models/init-models');

const models = initModels(db); // define models

// Test connection to Database
db.authenticate()
    .then(() => console.log('Database connected.'))
    .catch((e) => console.log('Error', e.message));

db.sync()

models.R1022.findAll({
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
    .then(res=>{
        console.log(res);
    })
    .catch(err=>console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})