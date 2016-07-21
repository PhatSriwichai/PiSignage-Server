process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express');
var app = express();
var port = 8080;

app.listen(port);
module.exports = app;

console.log('Server running at port '+port);