var models = require('../models');

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
    //check random code
    //短信验证码错误

    //check phone
    models.User.findOne({ phone: _user.phone })
        .then(function (user) {
            if (user) {
                return res.status(500).send({ msg: "该手机已被注册,如忘记密码请在登录界面选择“找回密码”" });
            }
        })
        .error(function(err) {
            console.log(err);
        });
    //check user
    //改用户名已被注册
    models.User.findOne({ name: _user.name })
        .then(function(user) {
            if (user) {
                return res.status(500).send({ msg: "改用户名已被注册" });
            }
        })
        .error(function(err) {
        });

    debugger;
    //save
  
    models.User.create(_user)
        .then(function(user) {
            debugger;
        }).catch(function (err) {
            debugger;
            return res.status(500).send({ msg: err.message });
        });


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


