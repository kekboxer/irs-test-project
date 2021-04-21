module.exports = function(sequelize, DataTypes) {
    return sequelize.define("r1022", {
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
}
