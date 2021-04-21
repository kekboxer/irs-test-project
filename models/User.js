module.exports = function(sequelize, DataTypes) {
    return sequelize.define("users", {
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                required: true
            },
            password: {
                type: DataTypes.STRING,
                required: true,
                allowNull: false
            },
        }, {
            tableName: 'users'
        }
    );
}
