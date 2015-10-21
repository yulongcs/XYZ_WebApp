﻿var Index = require('../app/controlles/index.js');
var Exchange = require('../app/controlles/exchange.js');
var AdminProduct = require('../app/controlles/admin/product.js');
var Common = require('../app/controlles/_common.js');
var multer = require('multer');
var upload = multer({ dest: '.tempUploads/' });

module.exports = function (app) {

    //// Index************
    app.get('/', Index.index)

    ////Exchange
    app.get('/exchange/new', Exchange.new)
    app.post('/exchange', upload.array(), Common.saveUploadFiles, Exchange.save)
     







    ////Admin ************************************************************************

    ////product
    //  //list
      app.get('/admin/product', AdminProduct.list)

}