const DataTypes = require("sequelize").DataTypes;
const _R1022 = require("./R1022");

module.exports = function initModels(sequelize) {
    const R1022 = _R1022(sequelize, DataTypes);
    return {
        R1022,
    };
}