module.exports = function(app, io, server){
	//var io = require('socket.io').listen(server);
	var db = require('../app/models/connectdb');
	var mysql = db.connectdb();
	require('../app/routes/socket.routes')(app, io, server);
	var fs = require('fs');



	io.on('connection', function(socket){
		var nick = socket.handshake.address;
		//nick = nick.substring(7, nick.length);
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

				var queryString = 'SELECT Assets.assetsId, Assets.assetsName, Assets.type, Assets.url, Assets.time, User.userName FROM Assets, User \
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
			var queryString = 'SELECT * FROM Schedule, Playlist WHERE groupId='+group+' \
			and Schedule.playlistId = Playlist.playlistId ORDER BY dateStart ASC, timeStart ASC';
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

			
		socket.on('update-playlist', function(message){
			var group = message;
			var queryString = 'UPDATE Playlist SET playlistName=?, description=? WHERE playlistId=?';
		   	var insert = [message.name, message.des, message.id];
		   	queryString = mysql.format(queryString, insert);
		   	mysql.query(queryString, function(err, fields){
		   		if(err){
		   			console.log(err);
		   		}else{
		   			console.log("update playlist "+message.id);
		   			
		   		}
		   	});

		});
		socket.on('delete-playlist', function(message){
			var id = message;
			var queryString = 'DELETE FROM Playlist WHERE playlistId=?';
		   	var insert = [id];
		   	queryString = mysql.format(queryString, insert);
		   	mysql.query(queryString, function(err, fields){
		   		if(err){
		   			console.log(err);
		   		}else{
		   			console.log("delete playlist "+message.id);
		   			
		   		}
		   	});

		});
		socket.on('update-schedule', function(message){
			var group = message;
			console.log(message);
			var queryString = 'UPDATE Schedule SET dateStart=?, timeStart=?, dateEnd=?, timeEnd=?, playlistId=?, \
			groupId = ? WHERE scheduleId=?';
		   	var insert = [message.dateStart, message.timeStart, message.dateEnd, message.timeEnd, message.playlist,
		   					message.groupId, message.sche];
		   	queryString = mysql.format(queryString, insert);
		   	mysql.query(queryString, function(err, fields){
		   		if(err){
		   			console.log(err);
		   		}else{
		   			console.log("update Schedule "+message.sche);
		   			
		   		}
		   	});

		});
		socket.on('delete-schedule', function(message){
			var id = message;
			var queryString = 'DELETE FROM Schedule WHERE scheduleId=?';
		   	var insert = [id];
		   	queryString = mysql.format(queryString, insert);
		   	mysql.query(queryString, function(err, fields){
		   		if(err){
		   			console.log(err);
		   		}else{
		   			console.log("delete schedule "+message.id);
		   			
		   		}
		   	});

		});
		socket.on('update-player', function(message){
			var group = message;
			var queryString = 'UPDATE Player SET name=?, playerMac=?, location=?, groupId=? WHERE playerId=?';
		   	var insert = [message.name, message.mac, message.location, message.group, message.id];
		   	queryString = mysql.format(queryString, insert);
		   	mysql.query(queryString, function(err, fields){
		   		if(err){
		   			console.log(err);
		   		}else{
		   			console.log("update player "+message.id);
		   			
		   		}
		   	});

		});
		socket.on('delete-player', function(message){
			var id = message;
			var queryString = 'DELETE FROM Player WHERE playerId=?';
		   	var insert = [id];
		   	queryString = mysql.format(queryString, insert);
		   	mysql.query(queryString, function(err, fields){
		   		if(err){
		   			console.log(err);
		   		}else{
		   			console.log("delete player "+id);
		   			
		   		}
		   	});

		});

		socket.on('update-groups', function(message){
			var group = message;
			var queryString = 'UPDATE Groups SET groupName=?, description=? WHERE groupId=?';
		   	var insert = [message.name, message.des, message.id];
		   	queryString = mysql.format(queryString, insert);
		   	mysql.query(queryString, function(err, fields){
		   		if(err){
		   			console.log(err);
		   		}else{
		   			console.log("update group "+message.id);
		   			
		   		}
		   	});

		});

		socket.on('delete-groups', function(message){
			var id = message;
			var queryString = 'DELETE FROM Groups WHERE groupId=?';
		   	var insert = [id];
		   	queryString = mysql.format(queryString, insert);
		   	mysql.query(queryString, function(err, fields){
		   		if(err){
		   			console.log(err);
		   		}else{
		   			console.log("delete group "+id);
		   			
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

	   		var queryString = "SELECT Assets.assetsId, Assets.assetsName, Assets.type, AddPlaylist.time_sec, AddPlaylist.position, AddPlaylist.format,\
	   							AddPlaylist.apId \
	   							FROM Assets LEFT JOIN AddPlaylist ON AddPlaylist.assetsId = Assets.assetsId \
						   		and AddPlaylist.playlistId = "+id+" and AddPlaylist.position = \'M\'"+ 
						   		"ORDER BY AddPlaylist.apId DESC";
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
			var position = 'S';
			id = message;
		   	//var queryString = "SELECT * FROM Assets LEFT JOIN AddPlaylist \
		   	//			ON AddPlaylist.assetsId = Assets.assetsId and AddPlaylist.playlistId = "+id+" ORDER BY apId DESC"
	   		//var queryString = 'SELECT * FROM Assets';

	   		var queryString = "SELECT Assets.assetsId, Assets.assetsName, Assets.type, AddPlaylist.time_sec, AddPlaylist.position, AddPlaylist.format,\
	   							AddPlaylist.apId \
	   							FROM Assets LEFT JOIN AddPlaylist ON AddPlaylist.assetsId = Assets.assetsId \
						   		and AddPlaylist.playlistId = "+id+" and AddPlaylist.position = \'S\' WHERE Assets.type=\'image\'"+ 
						   		"ORDER BY AddPlaylist.apId DESC";
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

			var queryString = 'SELECT Layout.layoutId, Layout.layoutCode,\
					 	Layout.layoutName, Playlist.layout FROM Layout LEFT JOIN Playlist \
						ON Playlist.playlistId=? AND Playlist.layout = Layout.layoutId';
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
			console.log("action: "+message[0]);
			io.emit(message[1]+'_action', message[0]);
           
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
			//console.log(address);
			//address = address.substring(7, address.length);
			
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