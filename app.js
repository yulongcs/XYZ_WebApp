var express = require('express');
var bodyParser = require('body-parser')
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var Sequelize = require('sequelize');
var http = require('http');
var path = require('path');

app = express();
app.use(express.static(path.join(__dirname, '')));//设置网站根目录
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'app/views'));
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./config/routes')(app)

//http.createServer(app).listen(app.get('port'), function () {
//    console.log('XYZ web server listening on port ' + app.get('port'));
//});

var models = require("./app/models");
models.sequelize.sync().then(function () {
    var server = app.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + server.address().port);
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;



//http://cdn.mysql.com/Downloads/MySQL-5.6/mysql-5.6.27-winx64.zip
//http://jingyan.baidu.com/article/f3ad7d0ffc061a09c3345bf0.html
//mysqladmin -u root password "newpass"
//net start mysql
//mysql -u root -p
//CREATE DATABASE IF NOT EXISTS yourdbname DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
//http://linmomo02.iteye.com/blog/1496736

//首页路由

//app.get('/', function(req, res, next) {
//    Project.findAll()
//        .done(function (result) {
//            //var data = result[0].title;
//            debugger;

//            res.render('index', {
//                title: 'index',
//                projects: result
//            });
//        });
//});

////删除项目路由

//app.del('/project/:id', function (req, res, next) {

//    Project.find(Number(req.params.id)).success(function (proj) {
//        proj.destroy()
//        .success(function () {
//            res.rend(200);
//        })
//        .error(next);
//    }).error(next);

//});

////创建项目路由
//https://www.npmjs.com/package/multer

app.post('/projects', upload.single('file'), function (req, res, next) {
    // req.file is the `avatar` file 
    // req.body will hold the text fields, if there were any 
    var filePath = req.file.path;

    res.send(req.file);

});

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    // req.files is array of `photos` files 
    // req.body will contain the text fields, if there were any 
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function(req, res, next) {
  //  req.files['avatar'][0] -> File 
  //  req.files['gallery'] -> Array 
})


////展示指定项目路由

//app.get('/project/:id/tasks', function (req, res, next) {

//    Project.find(Number(req.params.id))

//    .success(function (project) {

//        project.getTasks().on('success', function (tasks) {

//            res.render('tasks', { project: project, tasks: tasks });

//        })

//    })

//    .error(next);



//});

////为指定项目添加任务

//app.post('/project/:id/tasks', function (req, res, next) {

//    res.body.ProjectId = req.params.id;

//    Task.build(req.body).save()

//    .success(function (obj) {

//        res.send(obj);

//    })

//    .error(next);

//});

////删除任务路由

//app.del('/task/:id', function (req, res, next) {

//    Task.find(Number(req.params.id)).success(function (task) {

//        task.destroy()

//        .success(function () {

//            res.send(200);

//        })

//        .error(err);

//    }).error(next);

//});



//npm install --production