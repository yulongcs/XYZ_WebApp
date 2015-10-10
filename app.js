var express = require('express')

var http = require('http');
var path = require('path');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views/pages'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '')));//设置网站根目录

require('./config/routes')(app)

http.createServer(app).listen(app.get('port'), function () {
    console.log('XYZ web server listening on port ' + app.get('port'));
});





