var Index = require('../app/controlles/index.js');
var ExchangePro = require('../app/controlles/exchangePro.js');
var AdminProduct = require('../app/controlles/admin/product.js')

module.exports = function (app) {

    //// Index************
    app.get('/', Index.index)

    ////Exchange
    app.get('/exchange/new', ExchangePro.new)
    app.post('/exchange', ExchangePro.saveUploadImg, ExchangePro.save)
     







    ////Admin ************************************************************************

    ////product
    //  //list
      app.get('/admin/product', AdminProduct.list)

}