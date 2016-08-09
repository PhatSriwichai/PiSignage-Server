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
   			req.session.userId = rows[0].userId;
   			req.session.username = rows[0].username;
   			console.log('id: '+req.session.userId);
   			res.sendFile(pathView + '/views/index.html');
   		}else{
   			res.sendFile(pathView + '/views/login.html');
   		}
   	});
   	
};

exports.addAssets = function(req, res){
	var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    res.sendFile(pathView + '/views/assets_upload.html');
    //console.log(req.body.textTest);
    //var assetsList = "Test";
    //req.body.document.getElementById("list").innerHTML=assetsList;
    //};
    //res.sendFile('./app/views/assets_upload.html');
};

exports.assetsList = function(req, res){
  var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    res.sendFile(pathView + '/views/assetsList.html');
    //var assetsList = "Test";
    //req.body.document.getElementById("list").innerHTML=assetsList;
    //};
    //res.sendFile('./app/views/assets_upload.html');
};

exports.upload = function(req, res){
	//console.log(req.files.file.name);
	//console.log(req.session.userId);
	var db = require('../models/connectdb');
	var mysql = db.connectdb();

	//var queryString = 'INSERT INTO Assets(assetsName, ownId) VALUES(\''+req.files.file.name+'\','+req.session.userId+')';
	var queryString = 'INSERT INTO ??(??,??,??) VALUES(?, NOW(), ?)';
	var insert = ['Assets', 'assetsName', 'time','ownId', req.files.file.name, req.session.userId];
	queryString = mysql.format(queryString, insert);

	mysql.query(queryString,
        function(err, result){
            //console.log(pass);
            if(err){
                console.log(err);
            }else{
                console.log('added new assets');
            }
        }
  );
  var path = __dirname;
  var pathLength = path.length;
  var pathView = path.substring(0, pathLength-12);
  res.sendFile(pathView + '/views/assets_upload.html');
};