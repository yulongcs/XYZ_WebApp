var models = require('../../models');

// list page
exports.list = function(req, res) {
    models.Exchange.findAll()
        .done(function(result) {
            res.render('admin/pages/productList', {
                title: 'Product List',
                Exchanges: result
            });
        });
}