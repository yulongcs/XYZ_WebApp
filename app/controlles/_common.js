var path = require('path');
var async = require('async');
var fs = require("fs");
var rootPath = path.join(__dirname, "../..");
var env = process.env.NODE_ENV || "development";
var config = require(rootPath + '/config/config.json')[env];

exports.saveUploadFiles = function (req, res, next) {
    var fileArr = JSON.parse(req.body.file.files);
    var newFileFolderPath = (rootPath + config.uploadImageFolderPath).replace(/\//g, '\\');
    async.series({
        mkdirsPathSync: function (callback) {
            if (!fs.existsSync(newFileFolderPath)) {
                var pathtmp;
                newFileFolderPath.split(path.sep).forEach(function (dirname) {
                    if (pathtmp) {
                        pathtmp = path.join(pathtmp, dirname);
                    }
                    else {
                        pathtmp = dirname;
                    }
                    if (!fs.existsSync(pathtmp)) {
                        debugger;
                        if (!fs.mkdirSync(pathtmp, 0777)) {//0777   目录权限（读写权限），默认0777
                            return false;
                        }
                    }
                });
            }
            return callback(null);
        },
        copyUploadFile: function (callback) {
            fileArr.forEach(function (file) {
                var oldFilePath = rootPath + file.path;
                file.destination = config.uploadImageFolderPath
                file.filename = file.filename + '.' + file.mimetype.split('/')[1];
                file.path = (file.destination + file.filename).replace('//', '\\').replace('/', '\\');
                var newFile = rootPath + file.path
                try {
                    debugger;
                    fs.createReadStream(oldFilePath).pipe(fs.createWriteStream(newFile)); //copy
                    fs.unlinkSync(oldFilePath); //delete
                } catch (e) {
                    return callback(e);
                }
            });
            return callback(null, fileArr);
        }
    }, function (err, results) {
        if (err) console.error(err.message);
        req.body.files = fileArr;
        next();
    });

    
    //async.forEachOf(fileArr, function (file, key, callback) {
    //    var oldFilePath = rootPath + file.path;
    //    file.destination = config.uploadImageFolderPath
    //    file.filename = file.filename + '.' + file.mimetype.split('/')[1];
    //    file.path = file.destination + file.filename;
    //    var newFile = rootPath + file.path
    //    try {
    //        fs.createReadStream(oldFilePath).pipe(fs.createWriteStream(newFile)); //copy
    //        fs.unlinkSync(oldFilePath); //delete
    //    } catch (e) {
    //        return callback(e);
    //    }
    //}, function (err) {
    //    if (err) console.error(err.message);
    //});
    //req.body.files = fileArr;
    //next();
}