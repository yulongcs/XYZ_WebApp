var Index = require('../app/controlles/index.js');
var Exchange = require('../app/controlles/exchange.js');
var AdminProduct = require('../app/controlles/admin/product.js');
var Common = require('../app/controlles/_common.js');
var multer = require('multer');
var upload = multer({ dest: '.tempUploads/' });

module.exports = function (app) {

    //// Index************
    app.get('/', Index.index)

    ////Exchange
    app.get('/exchange/new', upload.array(), Exchange.new);
    app.get('/exchange/update:id',upload.array(), Exchange.update);
    app.get('/exchange/list', upload.array(), Exchange.list);
    app.get('/exchange/detail/:id', upload.array(), Exchange.detail);
    app.post('/exchange/save', upload.array(), Common.saveUploadFiles, Exchange.save);
    app.delete('/exchage/delete', upload.array(), Exchange.delete);
     







    ////Admin ************************************************************************

    ////product
    //  //list
      app.get('/admin/product', AdminProduct.list)

}