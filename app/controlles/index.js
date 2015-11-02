var async = require('async');
var models = require('../models');

// index page
exports.index = function (req, res) {
    models.Exchange.findAll({
        include: [models.File]
    }).then(function (result) {
        res.render('pages/index', {
            title: '闲余座 - 首页',
            Exchanges: result
        });
    });
}
  
