module.exports = function(app, io){
	//var io = require('socket.io').listen(server);
	var db = require('../app/models/connectdb');
	var mysql = db.connectdb();
	require('../app/routes/socket.routes')(app, io);
	var fs = require('fs');



	io.on('connection', function(socket){
		var nick = socket.handshake.address;
		nick = nick.substring(7, nick.length);
		socket.nickname = nick;
		console.log(socket+" connected.");
		var old_file = [];
		//==========================================================================================
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

			}else if(message == 'player'){

				var queryString = 'SELECT * FROM Player, Groups \
							WHERE Player.groupId = Groups.groupId';
		   	//var queryString = 'SELECT * FROM User)';
			   	mysql.query(queryString, function(err, rows, fields){
			   		if(err){
			   			console.log(err);
			   		}else{
			   			//console.log(rows);
			   			io.emit('player', rows);
			   		}
			   	});
			}else if(message == 'playlist'){

				var queryString = 'SELECT *FROM Playlist';
		   	//var queryString = 'SELECT * FROM User)';
			   	mysql.query(queryString, function(err, rows, fields){
			   		if(err){
			   			console.log(err);
			   		}else{
			   			//console.log(rows);
			   			io.emit('playlist', rows);
			   		}
			   	});
			}else if(message == 'playlist-assets'){
				var id;
				socket.on('playlist-assets', function(message){
					id = message;
				   	var queryString = "SELECT Assets.assetsId, Assets.assetsName, Assets.type, Assets.time, Assets.ownId, \
				   				AddPlaylist.apId, AddPlaylist.playlistId FROM Assets LEFT JOIN AddPlaylist \
				   				ON AddPlaylist.assetsId = Assets.assetsId and AddPlaylist.playlistId = "+id+" ORDER BY apId DESC"
			   		//var queryString = 'SELECT * FROM Assets';
				   	mysql.query(queryString, function(err, rows, fields){
				   		if(err){
				   			console.log(err);
				   		}else{
				   			//console.log(rows);
				   			io.emit('playlist-assets', rows);
				   		}
				   	});
				});

				
			}else if(message == 'show'){
				var id;
				socket.on('show', function(message){
					id = message;
					var queryString = 'SELECT assetsName, type FROM Assets WHERE assetsId = ?';
					var insert = [id];
					queryString = mysql.format(queryString, insert);

					mysql.query(queryString, function(err, rows, fields){
					    if(err){
					      	console.log(err);
					    }else{
					          io.emit('show', rows)
					    }
					});
				});
			}else if(message == 'player_in_group'){
				var id;

				socket.on('player_in_group', function(message){
					id = message;
					var queryString = 'SELECT * FROM Player, Groups WHERE Groups.groupId = ? and Player.groupId = Groups.groupId';
					var insert = [id];
					queryString = mysql.format(queryString, insert);

					mysql.query(queryString, function(err, rows, fields){
					    if(err){
					      	console.log(err);
					    }else{
					        io.emit('player_in_group', rows)
					    }
					});
				});
			}else if(message == 'file'){
				var path = __dirname;
			    var pathLength = path.length;
			    var pathFile = path.substring(0, pathLength-7);

				socket.on('file', function(message){
					
					if(!(old_file[0] == message[0] && old_file[1] == message[1])){
						console.log(message);
						var file = fs.readFile(pathFile+"/public/assets/"+message[0], "binary",function(err, buf){
	                                        
	                        if(err){
	                            console.log(err);
	                        }else{
	                        	var fileName = message[0];
	                        	var mac = message[1];
	                            var type = fileName.substring(fileName.length-3, fileName.length);

	                            io.emit(mac, fileName, buf, type);
	                            

	                        }
	                    });
					}
					old_file[0] = message[0];
					old_file[1] = message[1];
					
                   
				});
			}
		});
		
		//==========================================================================================
		socket.on('mac', function(message){
			var address = socket.handshake.address;
			address = address.substring(7, address.length);
			
			var queryString = 'SELECT * FROM Player \
							WHERE playerMac = ? LIMIT 1';
			var insert = [message];
			queryString = mysql.format(queryString, insert);
		   	//var queryString = 'SELECT * FROM User)';
			mysql.query(queryString, function(err, rows, fields){
			   	if(err){
			   		console.log(err);
			   	}else{
			   		
			   		if(rows.length > 0){
			   			var queryString = 'UPDATE Player SET status = ?, ip=? \
							WHERE playerMac = ? LIMIT 1';
						var insert = ['online',address, message];
						queryString = mysql.format(queryString, insert);
					   	//var queryString = 'SELECT * FROM User)';
						mysql.query(queryString, function(err, rows, fields){
						   	if(err){
						   		console.log(err);
						   	}else{
						   		var queryString = 'SELECT * FROM Player, Groups \
												WHERE Player.groupId = Groups.groupId';
							   	//var queryString = 'SELECT * FROM User)';
								   	mysql.query(queryString, function(err, rows, fields){
								   		if(err){
								   			console.log(err);
								   		}else{
								   			//console.log(rows);
								   			io.emit('player', rows);
								   		}
								   	});
						   	}
						});
			   		}else{
			   			/*var queryString = 'UPDATE Player SET status = ? \
							WHERE playerMac = ? LIMIT 1';
						var insert = ['offline', message];
						queryString = mysql.format(queryString, insert);
					   	//var queryString = 'SELECT * FROM User)';
						mysql.query(queryString, function(err, rows, fields){
						   	if(err){
						   		console.log(err);
						   	}else{
						   		console.log('update offline');
						   	}
						});*/
			   		}
			   		
			   			//io.emit('assets', rows);
			   	}
			});
		});
		//==========================================================================================
		socket.on('disconnect',function() {
			console.log(socket.nickname+" disconnect");
			
			var queryString = 'UPDATE Player SET status = ? WHERE ip=?';
			var insert = ['offline', socket.nickname];
			queryString = mysql.format(queryString, insert);
			//var queryString = 'SELECT * FROM User)';
			mysql.query(queryString, function(err, rows, fields){
				if(err){
					console.log(err);
				}else{
					//send update status to ui
					var queryString = 'SELECT Player.name,Player.location,Player.ip,Player.status, Groups.groupName FROM Player, Groups \
							WHERE Player.groupId = Groups.groupId';
				   	//var queryString = 'SELECT * FROM User)';
					   	mysql.query(queryString, function(err, rows, fields){
					   		if(err){
					   			console.log(err);
					   		}else{
					   			//console.log(rows);
					   			io.emit('player', rows);
					   		}
					   	});
						}
					});
		});
		
	});

	
	
	
	//return io;
}