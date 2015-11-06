﻿var models = require('../models');

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
    return res.send("OK");
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
    res.render('pages/user/facorites', {
        title: '我的收藏'
    });
}

exports.suggest = function (req, res) {
    res.render('pages/user/suggest', {
        title: '您的建议'
    });
}


