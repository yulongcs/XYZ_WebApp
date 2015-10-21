var async = require('async');

// index page
exports.index = function (req, res) {

    async.series({ //序列执行
        one: function (callback) {
            setTimeout(function () {
                //callback(null, 1);
            }, 1000);
        },
        two: function (callback) {
            setTimeout(function () {
                //callback(null, 2);
            }, 100);
        }
    },function (err, results) {
        debugger;
        // results is  equals to: {two: 2, one: 1}
    });

    async.parallel({ //平行执行
        one: function (callback) {
            setTimeout(function () {
                callback(null, 1);
            }, 1000);
        },
        two: function (callback) {
            setTimeout(function () {
                callback(null, 2);
            }, 100);
        }
    }, function (err, results) {
        debugger;
        // results is now equals to: {one: 1, two: 2}
    });


    res.render('pages/index', {
        title: 'index'
    })
}
  
