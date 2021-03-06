﻿var models = require('../models');
var async = require('async');

// index page
exports.index = function (req, res) {
    if (req.session.user) {
        var user = req.session.user;
        res.render('pages/user/index', {
            title: '闲余座 - 我的',
            user: user
        });
    } else {
        return res.redirect('/user/login');
    }
}

exports.login = function (req, res) {
    if (req.session.user) {
        return res.redirect('/user/index');
    } else {
        res.render('pages/user/login', {
            title: '登录'
        });
    }  
}

exports.login_save = function (req, res) {
    var _user = req.body.user;
    console.log(req.body);
    models.User.findOne({ where: { $or: [{ name: _user.name }, { phoneNumber: _user.name }] } })
        .then(function (user) {
            if (!user) {
                return res.status(500).send({ msg: "你输入的账号不存在" });
            }
            if (user.password !== _user.password) {
                return res.status(500).send({ msg: "你输入的账号密码不匹配" });
            }
            req.session.user = user
            return res.send("OK");
        })
        .error(function(err) {
            console.log(err);
        });
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
    });
}

exports.signinRequired = function(req, res, next) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('/user/login');
    }
    next();
}

exports.logout = function(req, res) {
    delete req.session.user;

    res.redirect('/user/login');
}

exports.newforgot = function (req, res) {
    res.render('pages/user/newforgot', {
        title: '找回密码'
    });
}

exports.newforgot_save = function (req, res) {
    var user = req.session.user;
    if (user) {
        return res.redirect('/user/index');
    }
    var _user = req.body.user;
    var userModel;
    console.log(req.body);
    async.series({
        checkPhone: function (callback) {
            models.User.findOne({ where: { phoneNumber: _user.phone } })
                .then(function(user) {
                    if (!user) {
                        return res.status(500).send({ msg: "手机号码不正确" });
                    }
                    debugger;
                    userModel = user;
                    return callback(null);
                })
                .error(function(err) {
                    console.log(err);
                });
        },
        checkRandomCode: function(callback) {
            return callback(null);
        },
        checkPassword: function (callback) {
            return callback(null);
        },
        save: function (callback) {
            debugger;
            models.User.update({
                password: _user.password
            }, userModel)
                .then(function (user) {
                    debugger;
                    return res.send("OK");
                }).catch(function (err) {
                    debugger;
                    return res.status(504).send({ msg: err.message });
                });
        }
    }, function (err, results) {
        debugger;
    });
}

exports.resetpwd = function (req, res) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('/user/login');
    }
    res.render('pages/user/resetpwd', {
        title: '修改密码'
    });
}

exports.resetpwd_save = function (req, res) {
    var user = req.session.user;
    if (!user) {
        return res.redirect('/user/login');
    }
    var _user = req.body.user;
    console.log(req.body);
    async.series({
        checkOldPwd: function (callback) {
            if (_user.oldpassword !== user.password) {
                return res.status(500).send({ msg: "原密码不正确" });
            }
            return callback(null);
        },
        checkPassword: function (callback) {
            if (_user.newpassword !== _user.confirmpassword) {
                return res.status(500).send({ msg: "新密码输入不一致" });
            }
            if (_user.newpassword === user.password) {
                return res.status(500).send({ msg: "新密码与原密码一致,请重新输入" });
            }
            return callback(null);
        },
        save: function (callback) {
            debugger;
            models.User.findOne({ where: { id: user.id } }).then(function (user) {
                models.User.update({
                        password: _user.newpassword
                    }, user)
                    .then(function (user) {
                        req.session.user.password = _user.newpassword;
                        debugger;
                        return res.send("OK");
                    }).catch(function(err) {
                        debugger;
                        return res.status(504).send({ msg: err.message });
                    });
            });
        }
    }, function (err, results) {
        debugger;
    });
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


