var express = require('express')
var port = process.env.PORT || 3000
var app = express()

app.set('views', 'views/pages')
app.set('view engine', 'jade')
app.listen(port)
console.log('xyz web app started on port ' + port);

//index page
app.get('/', function(req, res) {
	res.render('index', {
		title: '闲余座 首页'
	});
});
//require('./config/routes')(app)


