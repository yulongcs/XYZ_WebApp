

// list page
exports.list = function (req, res) {
    res.render('admin/pages/productList', {
        title: 'Product List'
    })
}