const DataTypes = require("sequelize").DataTypes;
const _R1022 = require("./R1022");
const _User = require("./User");
const _Mpe1gem = require("./Mpe1gem");

module.exports = function initModels(sequelize) {
    const R1022 = _R1022(sequelize, DataTypes);
    const User = _User(sequelize, DataTypes);
    const Mpe1gem = _Mpe1gem(sequelize, DataTypes);
    return {
        R1022,
        User,
        Mpe1gem
    };
}