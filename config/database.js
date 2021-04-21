const Sequelize = require('sequelize');
const config = require('config');

module.exports = new Sequelize('KPIS', config.get('db_username'), config.get('db_password'), {
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