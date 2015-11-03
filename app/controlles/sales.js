var path = require('path');
var fs = require("fs");
var rootPath = path.join(__dirname, "../..");
var models = require('../models');

exports.new = function (req, res) {
    res.render('pages/sales/new', {
        title: '闲余卖',
        Sales: {}
    })
}

exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        models.Sales.findById(id, { include: [models.File] }).then(function (result) {
            res.render('pages/sales/new', {
                title: '闲余卖',
                Sales: result
            })
        });       
    }   
}

exports.list = function(req, res) {
    models.Sales.findAll({
        include: [models.File]
    }).then(function (result) {
        res.render('pages/sales/list', {
            title: '列表页',
            Sales: result
        });
    });
}

exports.detail = function (req, res) {
    var id = req.params.id;
    if (id) {
        models.Sales.findById(id, { include: [models.File] }).then(function (result) {
            res.render('pages/sales/detail', {
                title: '求购',
                Buy: result
            })
        });
    }
}

exports.save = function (req, res) {
    var exchangeData = req.body.exchange;
    var fileData = req.body.files;
    models.sequelize.transaction(function (t) {
        // chain all your queries here. make sure you return them.
        return models.Sales.create(exchangeData, { transaction: t }).
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
        models.Sales.find(Number(id)).then(function (exchange) {
            exchange.destroy().then(function() {
                res.send("OK");
            });
        });
    }
}