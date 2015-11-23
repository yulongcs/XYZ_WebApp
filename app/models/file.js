"use strict";

module.exports = function (sequelize, dataTypes) {
    var file = sequelize.define("File", {
        fieldname: { type: dataTypes.STRING(100), allowNull: false },
        originalname: { type: dataTypes.STRING(100), allowNull: false },
        encoding: { type: dataTypes.STRING(100), allowNull: false },
        mimetype: { type: dataTypes.STRING(100), allowNull: false },
        destination: { type: dataTypes.STRING(100), allowNull: false },
        filename: { type: dataTypes.STRING(100), allowNull: false },
        path: { type: dataTypes.STRING(100), allowNull: false },
        size: { type: dataTypes.INTEGER, allowNull: false }
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