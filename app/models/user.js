"use strict";

module.exports = function (sequelize, dataTypes) {
    var user = sequelize.define("User", {
        name: { type: dataTypes.STRING(200), allowNull: false },
        password: { type: dataTypes.STRING(200), allowNull: false },
        role: { type: dataTypes.ENUM('admin', 'user'), allowNull: false },
        phoneNumber: { type: dataTypes.STRING(20), allowNull: false }
    }, {
        classMethods: {
            associate: function (models) {
                user.hasMany(models.exchange);
            }
        }
    });

    return user;
};