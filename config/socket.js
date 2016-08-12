module.exports = function(io){
	//var io = require('socket.io').listen(server);
	var db = require('../app/models/connectdb');
	var mysql = db.connectdb();

   

	io.on('connection', function(socket){
		socket.on('route', function(message){
			if(message == 'group'){
				var queryString = 'SELECT * FROM Groups';
   	//var queryString = 'SELECT * FROM User)';
			   	mysql.query(queryString, function(err, rows, fields){
			   		if(err){
			   			console.log(err);
			   		}else{
			   			//console.log(rows);
			   			io.emit('group', rows);
			   		}
			   	});
			}else if(message == 'asset'){
				var queryString = 'SELECT Assets.assetsId, Assets.assetsName, Assets.type, Assets.time, User.userName FROM Assets, User \
							WHERE Assets.ownId = User.userId';
		   	//var queryString = 'SELECT * FROM User)';
			   	mysql.query(queryString, function(err, rows, fields){
			   		if(err){
			   			console.log(err);
			   		}else{
			   			//console.log(rows);
			   			io.emit('assets', rows);
			   		}
			   	});
			}
		});
		console.log("client connected");
		socket.on('player', function(obj){
			console.log(obj.playerID);
		});
		
	});
	
	
	//return io;
}