var path = require('path');
var async = require('async');

var fs = require("fs");
var models = require('../models');
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

exports.new = function (req, res) {
    res.render('pages/exchange/new', {
        title: '交换'
    })
}

exports.save = function (req, res) {
    var exchangeData = req.body.exchange;
    var fileData = req.body.files;
    debugger;
    //models.File.create(fileData[0])
    //    .done(function (result) {
    //        var dataValue = result.dataValues;
    //        debugger;
    //        res.redirect('/admin/product');
    //    });

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
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(function (err) {
        debugger;
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
   
}