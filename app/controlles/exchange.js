var path = require('path');
var fs = require("fs");
var rootPath = path.join(__dirname, "../..");
var models = require('../models');

exports.new = function (req, res) {
    res.render('pages/exchange/new', {
        title: '交换',
        Exchanges: {}
    })
}

exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        models.Exchange.find(Number(id)).then(function (result) {
            res.render('pages/exchange/new', {
                title: '交换',
                Exchanges: result
            })
        });       
    }   
}

exports.list = function(req, res) {
    models.Exchange.findAll({
        include: [models.File]
    }).then(function (result) {
        res.render('pages/exchange/list', {
            title: '交换',
            Exchanges: result
        });
    });
}

exports.detail = function (req, res) {
    var id = req.params.id;
    if (id) {
        models.Exchange.findById(id, { include: [models.File] }).then(function (result) {
            res.render('pages/exchange/detail', {
                title: '交换',
                Exchange: result
            })
        });
    }
}

exports.save = function (req, res) {
    var exchangeData = req.body.exchange;
    var fileData = req.body.files;
    models.sequelize.transaction(function (t) {
        // chain all your queries here. make sure you return them.
        return models.Exchange.create(exchangeData, { transaction: t }).
            then(function (exchange) {
                fileData.forEach(function(item){
                    item.ExchangeId = exchange.dataValues.id;
                })
                models.File.bulkCreate(fileData, { transaction: t });
            });
    }).then(function () {
        return res.send("OK");
    }).catch(function (err) {       
        fileData.forEach(function(file) {
            fs.unlinkSync(rootPath + file.path); //delete upload image
        });
        return res.status(500).send({ msg: err.message });
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
}

exports.delete = function(req, res) {
    var id = req.params.id;
    if (id) {
        models.Exchange.find(Number(id)).then(function (exchange) {
            exchange.destroy().then(function() {
                res.send("OK");
            });
        });
    }
}