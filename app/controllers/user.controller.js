exports.login = function(req, res){
	var db = require('../models/connectdb');
	var mysql = db.connectdb();
	
    var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);

    //res.sendFile(pathView + '/views/login.html');
   	console.log(req.body);
   	console.log(req.body.username);
   	console.log(req.body.password);

   	var queryString = 'SELECT * FROM User WHERE username=\''+req.body.username+'\' and password=\''+req.body.password+'\' LIMIT 1';
   	//var queryString = 'SELECT * FROM User)';
   	mysql.query(queryString, function(err, rows, fields){
   		if(err){
   			console.log(err);
   		}

   		if(rows.length > 0){
   			res.sendFile(pathView + '/views/index.html');
   		}else{
   			res.sendFile(pathView + '/views/login.html');
   		}
   	});
   	
};

exports.addAssets = function(req, res){

};