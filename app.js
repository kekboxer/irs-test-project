const express = require('express');
const config = require('config');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();

const PORT = config.get('port') || 5000;

const db = new Sequelize('KPIS', config.get('db_username'), config.get('db_password'), {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false
    },

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

const R1022 = require('./models/R1022')(db, DataTypes); // define r1022 model

db.authenticate() // check connection to database
    .then(() => console.log('Database connected.'))
    .catch((e) => console.log('Error', e.message));

db.sync()

R1022.findAll({where:{utv: "1"}, raw: true })
    .then(res=>{
        console.log(res);
    }).catch(err=>console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})