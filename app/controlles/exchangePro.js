
exports.new = function(req, res) {
    res.render('pages/exchangePro/new', {
        title: '交换'
    })
}

exports.savePoster = function (req, res, next) {
    next();
}

exports.save = function (req, res) {
    res.send();
}




  
