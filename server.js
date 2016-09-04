process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var app = express();
//var multer = require('./config/multer')(app);
var port = 8080;

var createdb = require('./app/models/createdb');
var db = createdb.createdb();

var createtable = require('./app/models/createtable');
var table = createtable.createtable();


    //require('/app/routes/assets.routes')(app);

var server = app.listen(port, function(){
	console.log('Server running at port '+port);
});

//var io = socket();

var io = require('socket.io').listen(server);
var socket = require('./config/socket')(app, io);


module.exports = app;

