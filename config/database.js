const fs = require('fs');
const Sequelize = require('sequelize');
const config = require('config');

module.exports = new Sequelize('KPIS', config.get('db_username'), config.get('db_password'), {
    host: config.get('database_host'),
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