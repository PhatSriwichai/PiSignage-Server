module.exports = function(io){
	//var io = require('socket.io').listen(server);
	var db = require('../app/models/connectdb');
	var mysql = db.connectdb();

   

	io.on('connection', function(socket){
		console.log("client connected");
		var queryString = 'SELECT Assets.assetsId, Assets.assetsName, Assets.time, User.userName FROM Assets, User \
							WHERE Assets.ownId = User.userId';
   	//var queryString = 'SELECT * FROM User)';
	   	mysql.query(queryString, function(err, rows, fields){
	   		if(err){
	   			console.log(err);
	   		}else{
	   			console.log(rows);
	   			io.emit('assets', rows);
	   		}
	   	});
		
		
	});
	
	//return io;
}