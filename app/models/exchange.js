"use strict";

module.exports = function (sequelize, dataTypes) {
    var exchange = sequelize.define("Exchange", {
        title: {
            type: dataTypes.STRING(100), allowNull: false, validate: {
            notEmpty: true,
            len: [1, 30]
        } },
        claim: { type: dataTypes.STRING(200), allowNull: false },
        classification: { type: dataTypes.ENUM('居家生活', '家用电器', 'wifi设备', '摄影器材', '服装鞋包', '美妆护肤', '孕婴儿童', '宠物当家', '书籍文体', '交通工具', '卡券票务', '其他'), allowNull: false },
        degree: { type: dataTypes.ENUM('9成新', '7成新', '5成新', '3成新'), allowNull: false },
        cycle: { type: dataTypes.ENUM('一个月', '一周', '一天'), allowNull: false },
        expect: { type: dataTypes.ENUM('文学', '科幻', '教材', '诗歌', '散文', '小说', '其他'), allowNull: false },
        phoneNumber: { type: dataTypes.STRING(20), allowNull: false },
        contact: { type: dataTypes.STRING(20), allowNull: false },
        loco: { type: dataTypes.STRING(100), allowNull: false }
    }, {
        classMethods: {
            associate: function (models) {
                exchange.hasMany(models.File);
            }
        }
    });

    return exchange;
};