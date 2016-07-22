var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');

var multer = require('multer');
var fs = require('fs');

module.exports = function(){
	var app = express();
	if(process.env.NODE_ENV === 'development'){
		app.use(morgan('dev'));
	}else{
		app.use(compression);
	}
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	app.set('views', './app/views'); //path from server.js
	app.set('view engine', 'jade');

	var path = __dirname;
    var pathLength = path.length;
    var pathAssets = path.substring(0, pathLength-7);
    
	app.use(multer({
        dest: pathAssets + '/assets/',
        rename: function(fieldname, filename) {
            return filename;
        },
        limits: {
            fileSize: 10000000
        },
        onFileSizeLimit: function(file) {
            console.log('Failed: ' + file.originalname + ' is limited');
            fs.unlink(file.path);
        }
    }));

	require('../app/routes/index.routes')(app);

    

	return app;
};