var Index = require('../app/controlles/index.js')

var AdminProduct = require('../app/controlles/admin/product.js')

module.exports = function (app) {

    // Index
    app.get('/', Index.index)
    




    //Admin******************************************************
    app.get('/admin/product', AdminProduct.list)
   
}