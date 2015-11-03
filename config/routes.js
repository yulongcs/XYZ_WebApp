var Index = require('../app/controlles/index.js');
var Exchange = require('../app/controlles/exchange.js');
var Buy = require('../app/controlles/buy.js');
var Sales = require('../app/controlles/sales.js');
var User = require('../app/controlles/user.js');
var AdminProduct = require('../app/controlles/admin/product.js');
var Common = require('../app/controlles/_common.js');
var multer = require('multer');
var upload = multer({ dest: '.tempUploads/' });

module.exports = function (app) {

    //// Index************
    app.get('/', Index.index)

    //// Exchange
    app.get('/exchange/new', upload.array(), Exchange.new);
    app.get('/exchange/update:id',upload.array(), Exchange.update);
    app.get('/exchange/list', upload.array(), Exchange.list);
    app.get('/exchange/detail/:id', upload.array(), Exchange.detail);
    app.post('/exchange/save', upload.array(), Common.saveUploadFiles, Exchange.save);
    app.delete('/exchage/delete', upload.array(), Exchange.delete);
     
    //// Buy
    app.get('/buy/new', upload.array(), Buy.new);
    app.get('/buy/update:id', upload.array(), Buy.update);
    app.get('/buy/list', upload.array(), Buy.list);
    app.get('/buy/detail/:id', upload.array(), Buy.detail);
    app.post('/buy/save', upload.array(), Common.saveUploadFiles, Buy.save);
    app.delete('/buy/delete', upload.array(), Buy.delete);

    //// Sales
    app.get('/sales/new', upload.array(), Sales.new);
    app.get('/sales/update:id', upload.array(), Sales.update);
    app.get('/sales/list', upload.array(), Sales.list);
    app.get('/sales/detail/:id', upload.array(), Sales.detail);
    app.post('/sales/save', upload.array(), Common.saveUploadFiles, Sales.save);
    app.delete('/sales/delete', upload.array(), Sales.delete);

    //// User
    app.get('/user/index', upload.array(), User.index);
    app.get('/user/login', upload.array(), User.login);
    pp.post('/user/login/save', upload.array(), User.login_save);
    app.get('/user/register', upload.array(), User.register);
    app.post('/user/register/save', upload.array(), User.register_save);
    app.get('/user/newforgot', upload.array(), User.newforgot);
    app.post('/user/newforgot/save', upload.array(), User.newforgot_save);
    app.get('/user/resetpwd', upload.array(), User.resetpwd);
    app.post('/user/resetpwd/save', upload.array(), User.resetpwd_save);
    app.get('/user/release', upload.array(), User.release);
    app.get('/user/facorites', upload.array(), User.facorites);
    app.get('/user/suggest', upload.array(), User.suggest);

    //// Admin ************************************************************************

    //// product
    //// list
      app.get('/admin/product', AdminProduct.list)

}