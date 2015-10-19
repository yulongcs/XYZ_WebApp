var models = require('../models');

exports.new = function(req, res) {
    res.render('pages/exchangePro/new', {
        title: '交换'
    })
}


exports.save = function (req, res) {
    var data = req.body.exchange;
    debugger;
    models.Exchange.build(data).save()
        .done(function (result) {
            var dataValue = result.dataValues;
            debugger;
            res.redirect('/');
        });
}




  
