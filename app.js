var express = require('express');
var bodyParser = require('body-parser')
var multer = require('multer');
var upload = multer();
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

var node_env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

var config = require('./config/config')[node_env];
var dbStroage = new Sequelize(config.database, config.username, config.password, config.option);

//定义任务模型
var Project = dbStroage.define('project', {
    uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true
    },
    title: Sequelize.STRING,
    description: Sequelize.TEXT
});

var Task = dbStroage.define('task', {
    title: Sequelize.STRING
});

//设置联合

Task.belongsTo(Project);

Project.hasMany(Task);

dbStroage.sync();

//如果是第一次运行的话,需要用sync 方法创建表
//dbStroage.sync()
//    //.success(function () {
//    //    //用sequelize创建第一条数据
//    //    Project.create({
//    //        title: 't1',
//    //        description: 'd1'
//    //    }).done(function (err, result) {
//    //        console.log(err);
//    //        console.log(result);
//    //    })
//    //})
//    .success(function () {

//    })
//    .done(function (err, result) {
//        console.log(err);
//        console.log(result);
//    })
//    //.eror(function (err) {
//    //    console.log(err);
//    //});

//var Task = dbStroage.define('Task', {
//    // auto increment, primaryKey, unique
//    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true },

//    // comment
//    title: { type: Sequelize.STRING, comment: 'Task title' },

//    // allow null
//    description: { type: Sequelize.TEXT, allowNull: true },

//    // default value
//    deadline: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
//});
//Task.sync().on('success', function () {
//    console.log('aa..');
//}).on('failure', function () {
//    console.log('bb..');
//});




require('./config/routes')(app)

http.createServer(app).listen(app.get('port'), function () {
    console.log('XYZ web server listening on port ' + app.get('port'));
});



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

//app.post('/projects', upload.array(), function (req, res, next) {
//    var pro = req.body.pro;

//    Project.build(pro).save()
//        .done(function(obj) {
//            debugger;
//            res.send(obj);
//        });

//    //Project.create({
//    //    title: pro.title,
//    //    description: pro.description
//    //}).done(function (err, result) {
//    //    debugger;
//    //    console.log(err);
//    //    console.log(result);
//    //});

//});

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