"use strict";

module.exports = function (sequelize, DataTypes) {
    var Exchange = sequelize.define("Exchange", {
        title: { type: DataTypes.STRING(100), allowNull: false },
        claim: { type: DataTypes.STRING(200), allowNull: false },
        classification: { type: DataTypes.ENUM('书籍', '电器', '卡券', '其他'), allowNull: false },
        degree: { type: DataTypes.ENUM('9成新', '7成新', '5成新', '3成新'), allowNull: false },
        cycle: { type: DataTypes.ENUM('一个月', '一周'), allowNull: false },
        expect: { type: DataTypes.ENUM('文学', '小说'), allowNull: false },
        phoneNumber: { type: DataTypes.STRING(20), allowNull: false },
        contact: { type: DataTypes.STRING(20), allowNull: false },
        loco: { type: DataTypes.STRING(100), allowNull: false }
        //files_id: { type: DataTypes.STRING(100), allowNull: false }
    }, {
        classMethods: {
            associate: function (models) {
                Exchange.hasMany(models.File);
            }
        }
    });

    return Exchange;
};