module.exports = function(app, io, server){
	//var io = require('socket.io').listen(server);
	var db = require('../app/models/connectdb');
	var mysql = db.connectdb();
	require('../app/routes/socket.routes')(app, io, server);
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

				var queryString = 'SELECT * FROM Playlist';
		   	//var queryString = 'SELECT * FROM User)';
			   	mysql.query(queryString, function(err, rows, fields){
			   		if(err){
			   			console.log(err);
			   		}else{
			   			//console.log(rows);
			   			io.emit('playlist', rows);
			   		}
			   	});
			}

		});
		
		//==========================================================================================
		socket.on('schedule', function(message){
			var group = message;
			var queryString = 'SELECT * FROM Schedule WHERE groupId='+group;
		   	//var queryString = 'SELECT * FROM User)';
			   	mysql.query(queryString, function(err, rows, fields){
			   		if(err){
			   			console.log(err);
			   		}else{
			   			//console.log(rows);
			   			io.emit('schedule', rows);
			   		}
			   	});
		});

				
			

		socket.on('playlist-assets-main-zone', function(message){
			var id;
			var position = 'M';
			id = message;
		   	//var queryString = "SELECT * FROM Assets LEFT JOIN AddPlaylist \
		   	//			ON AddPlaylist.assetsId = Assets.assetsId and AddPlaylist.playlistId = "+id+" ORDER BY apId DESC"
	   		//var queryString = 'SELECT * FROM Assets';

	   		var queryString = "SELECT Assets.assetsId, Assets.assetsName, Assets.type, AddPlaylist.position, AddPlaylist.format,\
	   							AddPlaylist.apId, Layout.layoutId, Layout.layoutCode, Layout.layoutName \
	   							FROM Assets LEFT JOIN AddPlaylist ON AddPlaylist.assetsId = Assets.assetsId \
						   		and AddPlaylist.playlistId = "+id+" and AddPlaylist.position = \'M\'"+ 
						   		" LEFT JOIN Layout ON Layout.layoutId = AddPlaylist.layoutId ORDER BY apId DESC";
			//var insert = ['M'];
			//queryString = mysql.format(queryString, insert);
		   	mysql.query(queryString, function(err, rows, fields){
		   		if(err){
		   			console.log(err);
		   		}else{
		   			io.emit('playlist-assets-main-zone', rows);
		   		}
		   	});
		});
		socket.on('playlist-assets-slide-zone', function(message){
			var id;
			var position = 'M';
			id = message;
		   	//var queryString = "SELECT * FROM Assets LEFT JOIN AddPlaylist \
		   	//			ON AddPlaylist.assetsId = Assets.assetsId and AddPlaylist.playlistId = "+id+" ORDER BY apId DESC"
	   		//var queryString = 'SELECT * FROM Assets';

	   		var queryString = "SELECT Assets.assetsId, Assets.assetsName, Assets.type, AddPlaylist.position, AddPlaylist.format,\
	   							AddPlaylist.apId, Layout.layoutId, Layout.layoutCode, Layout.layoutName \
	   							FROM Assets LEFT JOIN AddPlaylist ON AddPlaylist.assetsId = Assets.assetsId \
						   		and AddPlaylist.playlistId = "+id+" and AddPlaylist.position = \'S\'"+ 
						   		" LEFT JOIN Layout ON Layout.layoutId = AddPlaylist.layoutId ORDER BY apId DESC";
			//var insert = ['M'];
			//queryString = mysql.format(queryString, insert);
		   	mysql.query(queryString, function(err, rows, fields){
		   		if(err){
		   			console.log(err);
		   		}else{
		   			io.emit('playlist-assets-slide-zone', rows);
		   		}
		   	});
		});


		socket.on('show', function(message){
			var id;
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

		socket.on('player_in_group', function(message){
			var id;
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

		socket.on('ticker', function(message){
			var id;
			id = message;
			var queryString = 'SELECT * FROM Ticker WHERE Ticker.playlistId = ?';
			var insert = [id];
			queryString = mysql.format(queryString, insert);

			mysql.query(queryString, function(err, rows, fields){
			    if(err){
			      	console.log(err);
			    }else{
			        io.emit('ticker', rows)
			    }
			});
		});

		socket.on('layout', function(message){
			var id;
			id = message;
			//var queryString = 'SELECT AddPlaylist.apId, Layout.layoutId, Layout.layoutCode,\
			//				 	Layout.layoutName FROM Layout LEFT JOIN AddPlaylist \
			//					ON AddPlaylist.playlistId=? AND AddPlaylist.layoutId = Layout.layoutId';
			/*var queryString = "SELECT layoutId FROM AddPlaylist WHERE playlistId=? LIMIT 1"
			var insert = [id];		 
			queryString = mysql.format(queryString, insert);

			mysql.query(queryString, function(err, rows, fields){
			    if(err){
			      	console.log(err);
			    }else{

			    }
			});*/

			var queryString = 'SELECT AddPlaylist.apId, Layout.layoutId, Layout.layoutCode,\
					 	Layout.layoutName FROM Layout LEFT JOIN AddPlaylist \
						ON AddPlaylist.playlistId=? AND AddPlaylist.layoutId = Layout.layoutId';
			var insert = [id];		 
			queryString = mysql.format(queryString, insert);

			mysql.query(queryString, function(err, rows, fields){
			    if(err){
			      	console.log(err);
			    }else{
			    	//console.log(rows);
			        io.emit('layout', rows);
			    }
			});

		});

		socket.on('clear_ticker', function(message){
			var id;
			id = message;
			var queryString = 'DELETE FROM Ticker WHERE playlistId = ?';
			var insert = [id];
			queryString = mysql.format(queryString, insert);

			mysql.query(queryString, function(err, result){
			    if(err){
			      	console.log(err);
			    }else{
			        console.log('delete ticker');
			    }
			});
		});

		socket.on('action', function(message){
			console.log("action: "+message);
			io.emit('action', message);
           
		});

		socket.on('file', function(message){
			var path = __dirname;
		    var pathLength = path.length;
		    var pathFile = path.substring(0, pathLength-7);
			
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
			          
		});

		socket.on('setSchedule', function(message){
			
			var queryString = 'INSERT INTO Schedule(??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)';
			var insert = ['dateStart', 'dateEnd', 'timeStart', 'timeEnd', 'playlistId', 'groupId',
				message[0], message[1], message[2], message[3], message[4], message[5]];
			queryString = mysql.format(queryString, insert);

			mysql.query(queryString, function(err, result){
			   	if(err){
			   		console.log(err);
			   	}else{
			   		console.log(result);
			   	}
			   		
			});

		});
		
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