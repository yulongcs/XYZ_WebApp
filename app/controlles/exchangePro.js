var fs = require("fs");
var models = require('../models');
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + '/../../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

exports.new = function(req, res) {
    res.render('pages/exchangePro/new', {
        title: '交换'
    })
}

exports.saveUploadImg = function (req, res, next) {

    var fileArr = req.body.file.files.split(';');
    debugger;
    if (fileArr) {
        fileArr.forEach(function (filePath) {
            debugger;
            fs.lstatSync(filePath, function (err, data) {
                debugger;
            });
        });
    }
    else { }
    //if (originalFilename) {
    //    fs.readFile(filePath, function (err, data) {
    //        var timestamp = Date.now()
    //        var type = posterData.type.split('/')[1]
    //        var poster = timestamp + '.' + type
    //        var newPath = path.join(__dirname, '../../', '/public/upload/' + poster)

    //        fs.writeFile(newPath, data, function (err) {
    //            req.poster = poster
    //            next()
    //        })
    //    })
    //}
    //else {
    //    next()
    //}
}

exports.save = function (req, res) {
    var exchangeData = req.body.exchange;
    var fileData = req.body.fileImgs;
    debugger;
    //models.Exchange.build(data).save()
    //    .done(function (result) {
    //        var dataValue = result.dataValues;
    //        debugger;
    //        res.redirect('/admin/product');
    //    });

    models.sequelize.transaction(function (t) {
        // chain all your queries here. make sure you return them.
        return models.Exchange.create(exchangeData, { transaction: t }).
        then(function (exchange) {
            fileData.ExchangeId = exchange.dataValues.id;
            return models.Exchange.create(fileData, { transaction: t });
        });
    }).then(function (result) {
        debugger;
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(function (err) {
        debugger;
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
}




  
