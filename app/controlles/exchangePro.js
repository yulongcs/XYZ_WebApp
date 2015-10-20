var path = require('path');
var async = require('async');

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
    var fileArr = JSON.parse(req.body.file.files);
    var newFileArr = new Array();
    async.forEachOf(fileArr, function(file, key, callback) {
        var oldFilePath = path.join(__dirname, "../../", file.path);
        file.destination = '/app/uploads/'
        file.filename = file.filename + '.' + file.mimetype.split('/')[1];
        file.path = file.destination + file.filename;
        var newFile = path.join(__dirname, "../../", file.path);
        try {
            fs.createReadStream(oldFilePath).pipe(fs.createWriteStream(newFile)); //copy
            fs.unlinkSync(oldFilePath); //delete
            newFileArr.push(file);
        } catch (e) {
            return callback(e);
        }
    }, function(err) {
        if (err) console.error(err.message);
    });
    debugger;
    req.body.fileImgs = newFileArr;
    next();

    //fileArr.forEach(function(file) {
    //    fs.readFile(file.path, function(err, data) {
    //        var oldFilePath = file.path;
    //        file.destination = 'app/uploads/'
    //        file.filename = file.filename + '.' + file.mimetype.split('/')[1];
    //        file.path = file.destination + file.filename;
    //        //fs.writeFile(newPath, data, function (err) {
    //        //    if (err) {
    //        //        debugger;
    //        //    }
    //        //    newfileArr.push(file);
    //        //});
    //        fs.createReadStream(oldFilePath).pipe(fs.createWriteStream(file.path)); //copy
    //        fs.unlinkSync(oldFilePath); //delete
    //        newFileArr.push(file);
    //        debugger;
    //    });
    //})
    //debugger;
    //req.body.fileImgs = newFileArr;
    //next();
}

exports.save = function (req, res) {
    var exchangeData = req.body.exchange;
    var fileData = req.body.fileImgs;
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
       
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(function (err) {
        debugger;
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    });
    res.redirect('/admin/product');
}




  
