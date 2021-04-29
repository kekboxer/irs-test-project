module.exports = function (sequelize, DataTypes) {
    return sequelize.define("mpe1gem", {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            npp: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            r1022: {
                type: DataTypes.STRING(11),
                allowNull: false,
            },
            naim_org: {
                type: DataTypes.STRING(1000)
            },
            adr_fact: {
                type: DataTypes.STRING(1000),
            },
            inn: {
                type: DataTypes.STRING(100)
            },
            plazma_max: {
                type: DataTypes.DECIMAL(17, 6)
            },
            plazma_cena: {
                type: DataTypes.DECIMAL(17, 6)
            },
            erm_max: {
                type: DataTypes.DECIMAL(17, 6)
            },
            erm_cena: {
                type: DataTypes.DECIMAL(17, 6)
            },
            immg_max: {
                type: DataTypes.DECIMAL(17, 6)
            },
            immg_cena: {
                type: DataTypes.DECIMAL(17, 6)
            },
            alb_max: {
                type: DataTypes.DECIMAL(17, 6)
            },
            alb_cena: {
                type: DataTypes.DECIMAL(17, 6)
            },
        }, {
            tableName: 'mpe1gem',
            schema: 'minzdrav',
        }
    );
}
