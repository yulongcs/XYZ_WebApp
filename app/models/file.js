"use strict";

module.exports = function (sequelize, DataTypes) {
    var File = sequelize.define("User", {
        fieldname: DataTypes.STRING,
        originalname: DataTypes.STRING,
        encoding: DataTypes.STRING,
        mimetype: DataTypes.STRING,
        destination: DataTypes.STRING,
        filename: DataTypes.STRING,
        path: DataTypes.STRING,
        size: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models) {
                User.hasMany(models.Task)
            }
        }
    });

    return File;
};