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

exports.uploadVideo = function(req, res){
	//console.log(req.files.file.name);
	//console.log(req.session.userId);
	var db = require('../models/connectdb');
	var mysql = db.connectdb();

	//var queryString = 'INSERT INTO Assets(assetsName, ownId) VALUES(\''+req.files.file.name+'\','+req.session.userId+')';
	var queryString = 'INSERT INTO ??(??,??,??,??) VALUES(?, NOW(), \'video\', ?)';
	var insert = ['Assets', 'assetsName', 'time','type','ownId', req.files.file.name, req.session.userId];
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
  res.redirect('back');
};

exports.uploadImage = function(req, res){
  //console.log(req.files.file.name);
  //console.log(req.session.userId);
  var db = require('../models/connectdb');
  var mysql = db.connectdb();

  //var queryString = 'INSERT INTO Assets(assetsName, ownId) VALUES(\''+req.files.file.name+'\','+req.session.userId+')';
  var queryString = 'INSERT INTO ??(??,??,??,??) VALUES(?, NOW(), \'image\', ?)';
  var insert = ['Assets', 'assetsName', 'time','type','ownId', req.files.file.name, req.session.userId];
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
  
  res.redirect('back');
};

exports.playerRender = function(req, res){
 var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    res.sendFile(pathView + '/views/player.html');
};

exports.groupRender = function(req, res){
 var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    res.sendFile(pathView + '/views/group.html');
};

exports.registerPlayer = function(req, res){
  var db = require('../models/connectdb');
  var mysql = db.connectdb();

  var queryString = 'INSERT INTO ??(??,??,??,??,??,??) VALUES(?,\'offline\',?,?,?,?)';
  var insert = ['Player', 'playerMac', 'status', 'name', 'location', 'groupId', 'ownId', 
              req.body.playerId, req.body.playerName, req.body.location, req.body.group, req.session.userId];
  queryString = mysql.format(queryString, insert);

  mysql.query(queryString,
        function(err, result){
            //console.log(pass);
            if(err){
                console.log(err);
            }else{
                console.log('added new player');
            }
        }
  );
  
  res.redirect('back');
};

exports.addGroup = function(req, res){
  var db = require('../models/connectdb');
  var mysql = db.connectdb();

  var queryString = 'INSERT INTO ??(??,??) VALUES(?,?)';
  var insert = ['Groups', 'groupName', 'description', req.body.add, req.body.description];
  queryString = mysql.format(queryString, insert);

  mysql.query(queryString,
        function(err, result){
            //console.log(pass);
            if(err){
                console.log(err);
            }else{
                console.log('added new group');
            }
        }
  );
  
  res.redirect('back');
};

exports.playListRender = function(req, res){
 var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    res.sendFile(pathView + '/views/playlist.html');
};

exports.addPlayList = function(req, res){
  var db = require('../models/connectdb');
  var mysql = db.connectdb();

  var queryString = 'INSERT INTO ??(??,??) VALUES(?,?)';
  var insert = ['Playlist', 'playlistName', 'description', req.body.add, req.body.description];
  queryString = mysql.format(queryString, insert);

  mysql.query(queryString,
        function(err, result){
            //console.log(pass);
            if(err){
                console.log(err);
            }else{
                console.log('added new playlist');
            }
        }
  );
  
  res.redirect('back');
};

exports.playListOrder = function(req, res){
 var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    res.sendFile(pathView + '/views/playlistOrder.html');
};