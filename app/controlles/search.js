var models = require('../models');

// index page
exports.index = function (req, res) {
    res.render('pages/user/index', {
        title: '闲余座 - 搜索'
    });
}