var models = require('../models');
var async = require('async');

// index page
exports.index = function(req, res) {
    res.render('pages/user/index', {
        title: '闲余座 - 我的'
    });
}

exports.login = function (req, res) {
    res.render('pages/user/login', {
        title: '登录'
    });
}

exports.login_save = function (req, res) {
    return res.send("OK");
}

exports.register = function (req, res) {
    res.render('pages/user/register', {
        title: '注册'
    });
}

exports.register_save = function (req, res) {
    var _user = req.body.user;
    console.log(req.body);

    async.series({
        //one: function (callback) {
        //    debugger;
        //    setTimeout(function () {
        //        callback(null, 1);
        //    }, 1000);
        //},

        //two: function (callback) {
        //    debugger;
        //    setTimeout(function () {
        //        callback(null, 2);
        //    }, 100);
        //}
        checkPhone: function(callback) {
            //check phone
            models.User.findOne({ where: { phoneNumber: _user.phone }})
                .then(function (phone) {
                    if (phone) {
                        return res.status(500).send({ msg: "该手机已被注册,如忘记密码请在登录界面选择“找回密码”" });
                    }
                   return callback(null);
                })
                .error(function(err) {
                    console.log(err);
                });
        },
        checkUser: function(callback) {
            //check user
            //改用户名已被注册
            models.User.findOne({ where: { name: _user.name } })
                .then(function (user) {
                    if (user) {
                        return res.status(500).send({ msg: "改用户名已被注册" });
                    }
                   return callback(null);
                })
                .error(function (err) {
                    console.log(err);
                });
        },
        save: function (callback) {
            debugger;
            models.User.create({
                    name: _user.name,
                    phoneNumber: _user.phone,
                    password: _user.password
                })
                .then(function(user) {
                    debugger;
                    return res.send("OK");
                }).catch(function(err) {
                    debugger;
                    return res.status(504).send({ msg: err.message });
                });
        }
    }, function (err, results) {
        debugger;
        // results is now equals to: {one: 1, two: 2}
    });

    //check random code
    //短信验证码错误

    

    //debugger;
    


//return res.send("OK");
}

exports.newforgot = function (req, res) {
    res.render('pages/user/newforgot', {
        title: '找回密码'
    });
}

exports.newforgot_save = function (req, res) {
    return res.send("OK");
}

exports.resetpwd = function (req, res) {
    res.render('pages/user/resetpwd', {
        title: '修改密码'
    });
}

exports.resetpwd_save = function (req, res) {
    return res.send("OK");
}

exports.release = function (req, res) {
    res.render('pages/user/release', {
        title: '我的发布'
    });
}

exports.facorites = function (req, res) {
    res.render('pages/user/favorites', {
        title: '我的收藏'
    });
}

exports.suggest = function (req, res) {
    res.render('pages/user/suggest', {
        title: '您的建议'
    });
}


