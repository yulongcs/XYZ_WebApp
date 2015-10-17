var sequelize = require('sequelize');

var Exchange = sequelize.define("exchange", {
    id: { type: Sequelize.UUIDV4, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    title: { type: Sequelize.STRING(100), allowNull: false },
    claim: { type: Sequelize.STRING(200), allowNull: false },
    classification: { type: Sequelize.ENUM('书籍', '电器', '卡券', '其他'), allowNull: false },
    degree: { type: Sequelize.ENUM('9成新', '7成新', '5成新', '3成新'), allowNull: false },
    cycle: { type: Sequelize.ENUM('一个月', '一周'), allowNull: false },
    expect: { type: Sequelize.ENUM('文学', '小说'), allowNull: false },
    phoneNumber: { type: Sequelize.STRING(20), allowNull: false },
    contact: { type: Sequelize.STRING(20), allowNull: false },
    loco: { type: Sequelize.STRING(100), allowNull: false },
    files_id: { type: Sequelize.STRING(100), allowNull: false },
});