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

db.authenticate()
    .then(() => console.log('Database connected.'))
    .catch((e) => console.log('Error', e.message));

const R1022 = db.define("r1022", {
    p00: {
        type: DataTypes.STRING(11),
        allowNull: false,
        primaryKey: true
    },
    p01: {
        type: DataTypes.STRING(500)
    },
    utv: {
        type: DataTypes.STRING(1),
        defaultValue: 0,
        allowNull: false,
    },
    p02: {
        type: DataTypes.STRING(500)
    },
    sp: {
        type: DataTypes.STRING(1),
        defaultValue: 0
    },
}, {
    tableName: 'r1022'
}
);

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