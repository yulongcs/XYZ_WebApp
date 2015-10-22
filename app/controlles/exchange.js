var path = require('path');
var fs = require("fs");
var rootPath = path.join(__dirname, "../..");
var models = require('../models');

exports.new = function (req, res) {
    res.render('pages/exchange/new', {
        title: '交换'
    })
}

exports.save = function (req, res) {
    var exchangeData = req.body.exchange;
    var fileData = req.body.files;
    fileData.claim = null;
    models.sequelize.transaction(function (t) {
        // chain all your queries here. make sure you return them.
        return models.Exchange.create(exchangeData, { transaction: t }).
            then(function (exchange) {
                fileData.forEach(function(item){
                    item.ExchangeId = exchange.dataValues.id;
                })
                return models.File.bulkCreate(fileData, { transaction: t });
            });
    }).then(function (result) {
        res.redirect('/admin/product');
    }).catch(function (err) {
       
        fileData.forEach(function(file) {
            fs.unlinkSync(rootPath + file.path); //delete upload image
        });
        debugger;
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
}