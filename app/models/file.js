"use strict";

module.exports = function (sequelize, DataTypes) {
    var file = sequelize.define("File", {
        fieldname: { type: DataTypes.STRING(100), allowNull: false },
        originalname: { type: DataTypes.STRING(100), allowNull: false },
        encoding: { type: DataTypes.STRING(100), allowNull: false },
        mimetype: { type: DataTypes.STRING(100), allowNull: false },
        destination: { type: DataTypes.STRING(100), allowNull: false },
        filename: { type: DataTypes.STRING(100), allowNull: false },
        path: { type: DataTypes.STRING(100), allowNull: false },
        size: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        classMethods: {
            associate: function(models) {
                file.belongsTo(models.Exchange, {
                    onDelete: "CASCADE",
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return file;
};