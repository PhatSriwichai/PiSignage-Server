module.exports = function(app, io, server){
	var fs = require('fs');
  var ip = require('ip');
  //console.log(app.address().port);
	//var socket = require('../controllers/socket.controller');
	app.get('/socket/send', function(req, res){
      var path = __dirname;
      var pathLength = path.length;
      var pathFile = path.substring(0, pathLength-11);

		//io.emit('file', fs.createReadStream(pathFile+"/public/assets/aaa.jpg"));
      var file = fs.readFile(pathFile+"/public/assets/aaa.jpg", "binary",function(err, buf){
          if(err){
              console.log(err);
          }else{
              io.emit('file', 'aaa.jpg', buf);
          }
      });
      //console.log(file);
      //io.emit('file', file.toString('base64s'));

      res.redirect('back');
          
	});

  app.post('/deploy', function(req, res){
      var path = __dirname;
      var pathLength = path.length;
      var pathFile = path.substring(0, pathLength-11);
     
      var db = require('../models/connectdb');
      var mysql = db.connectdb();
      var playerIP;
      var group = req.body.id;
      var queryString = 'SELECT * FROM Player WHERE groupId = ?';
      var insert = [req.query.id];

      queryString = mysql.format(queryString, insert);
      mysql.query(queryString,function(err, rows, fields){
                //console.log(pass);
          playerIP = rows;  
                if(err){
                    console.log(err);
                }else{
                    var play = rows;
                    /*queryString = 'SELECT * FROM AddPlaylist, Assets, Playlist \
                                      WHERE AddPlaylist.playlistId=? \
                                      and AddPlaylist.assetsId = Assets.assetsId and Playlist.playlistId=?';*/

                    queryString = 'SELECT * FROM AddPlaylist, Assets, Layout, Playlist \
                                  LEFT JOIN Ticker ON Ticker.playlistId = Playlist.playlistId \
                                  WHERE AddPlaylist.playlistId=? and AddPlaylist.assetsId = Assets.assetsId \
                                  and Playlist.playlistId=? and Playlist.layout = Layout.layoutId';

                    insert = [req.body.playlist, req.body.playlist];
                    queryString = mysql.format(queryString, insert);

                    mysql.query(queryString,function(err, rows, fields){
                              //console.log(pass);
                        if(err){
                            console.log(err);
                        }else{
                            if(rows.length > 0){
                                var i;
                                var j; 
                                for(i=0; i<play.length; i++){
                                  var mac = play[i].playerMac.toLowerCase();
                                  
                                  var package = [];
                                  var listFile = [];
                                  var listFormat = [];
                                  var listType = [];
                                  var listPosition = [];
                                  var listTime = [];
                                  var listUrl = [];
                                    for(j=0; j<rows.length; j++){
                                      var fileName = '';
                                      listTime.push(rows[j].time_sec);
                                      listUrl.push(rows[j].url);
                                      listPosition.push(rows[j].position);
                                      //listUrl.push(rows[j].url);
                                        if(rows[j].format == 'url'){
                                            fileName = "http://"+ip.address()+":"+server.address().port+
                                                      "/assets/"+rows[j].assetsName;
                                            listFile.push(fileName);
                                            listFormat.push('url');
                                            listType.push(rows[j].type);
                                        }else{
                                            fileName = rows[j].assetsName;
                                            listFile.push(fileName);
                                            listFormat.push('file'); 
                                            listType.push(rows[j].type);
                                            
                                        }
                                        
                                        
                                       
                                        
                                        //console.log("send "+fileName+" to "+mac); 
                                    }
                                    var ticker = [];

                                    if(rows[0].tickerMessage == null){
                                        ticker.push('none');
                                        ticker.push('none');
                                    }else{
                                        ticker.push(rows[0].tickerMessage);
                                        ticker.push(rows[0].behavior);
                                    }
                                    var layout = [];
                                    layout.push(rows[0].layoutCode);
                                    package.push(listFile);
                                    package.push(listFormat);
                                    package.push(listType);
                                    package.push(listTime);
                                    package.push(ticker);
                                    package.push(listPosition);
                                    package.push(layout);
                                    package.push(listUrl);
                                    console.log(package);
                                    console.log("send");
                                    io.emit(mac+"_check", package, rows[0].playlistName);
                                    io.emit(mac+"_control", rows[0].playlistName);
                                }
                            }
                            
                        }
                    });
                    queryString = "SELECT * FROM Playlist, Schedule, Groups WHERE Playlist.playlistId = Schedule.playlistId "+
                                  "and Groups.groupId = ? and Groups.groupId = Schedule.groupId ";
                    insert = [req.query.id];
                    playlistSche = [];
                    queryString = mysql.format(queryString, insert);
                    mysql.query(queryString,function(err, rows, fields){
                        if(err){
                          console.log(err);
                        }else{
                            var package = [];
                            var playlist = [];
                            var dateStart = [];
                            var timeStart = [];
                            var dateEnd = [];
                            var timeEnd = [];
                             
                            for(var j = 0; j < rows.length; j++){
                                playlist.push(rows[j].playlistName);
                                dateStart.push(rows[j].dateStart);
                                timeStart.push(rows[j].timeStart);
                                dateEnd.push(rows[j].dateEnd);
                                timeEnd.push(rows[j].timeEnd);
                                playlistSche.push(rows[j].playlistId);

                            }

                            package.push(playlist);
                            package.push(dateStart);
                            package.push(timeStart);
                            package.push(dateEnd);
                            package.push(timeEnd);

                            console.log(package);
                            for(var i = 0; i < play.length; i++){
                                var mac = play[i].playerMac.toLowerCase();
                                io.emit(mac+'_schedule', package);

                            }
                        }

                        for(var i=0; i<playlistSche.length; i++){
                            /*var queryString = "SELECT * FROM Schedule, Playlist, AddPlaylist, Assets \
                              WHERE Schedule.groupId = ? \
                              and Schedule.playlistId = Playlist.playlistId = AddPlaylist.playlistId \
                              and AddPlaylist.assetsId = Assets.assetsId And Schedule.playlistId = ?";*/

                            var queryString = 'SELECT * FROM AddPlaylist, Assets, Layout, Playlist \
                                  LEFT JOIN Ticker ON Ticker.playlistId = Playlist.playlistId \
                                  WHERE AddPlaylist.playlistId=? and AddPlaylist.assetsId = Assets.assetsId \
                                  and Playlist.playlistId=? and Playlist.layout = Layout.layoutId';
                            var insert = [playlistSche[i], playlistSche[i]];
                            queryString = mysql.format(queryString, insert);
                            mysql.query(queryString, function(err, rows, field){
                                if(err){
                                    console.log(err);
                                }else{
                                    
                                    for(var j=0; j<rows.length; j++){
                                        if(rows.length > 0){
                                            var mac = play[j].playerMac.toLowerCase();
                                            //console.log(play);
                                            var package = [];
                                            var listFile = [];
                                            var listFormat = [];
                                            var listType = [];
                                            var listPosition = [];
                                            var listTime = [];
                                            var listUrl = [];
                                              for(j=0; j<rows.length; j++){
                                                var fileName = '';
                                                listTime.push(rows[j].time_sec);
                                                listPosition.push(rows[j].position);
                                                listUrl.push(rows[j].url);
                                                  if(rows[j].format == 'url'){
                                                      fileName = "http://"+ip.address()+":"+server.address().port+
                                                                "/assets/"+rows[j].assetsName;
                                                      listFile.push(fileName);
                                                      listFormat.push('url');
                                                      listType.push(rows[j].type);
                                                  }else{
                                                      fileName = rows[j].assetsName;
                                                      listFile.push(fileName);
                                                      listFormat.push('file'); 
                                                      listType.push(rows[j].type);
                                                      
                                                  }
 
                                              }
                                              var ticker = [];

                                              if(rows[0].tickerMessage == null){
                                                  ticker.push('none');
                                                  ticker.push('none');
                                              }else{
                                                  ticker.push(rows[0].tickerMessage);
                                                  ticker.push(rows[0].behavior);
                                              }
                                              var layout = [];
                                              layout.push(rows[0].layoutCode);
                                              package.push(listFile);
                                              package.push(listFormat);
                                              package.push(listType);
                                              package.push(listTime);
                                              package.push(ticker);
                                              package.push(listPosition);
                                              package.push(layout);
                                              package.push(listUrl);
                                              console.log(package);
                                              console.log("Play Sche");
                                              io.emit(mac+"_check", package, rows[0].playlistName);
                                              //io.emit(mac+"_control", rows[0].playlistName);
                                          }

                                        }
                                    
                                }
                            });
                        }
                        
                    });

                }
      });
      //var queryString = 'INSERT INTO Assets(assetsName, ownId) VALUES(\''+req.files.file.name+'\','+req.session.userId+')';
      
      res.redirect('back');
  });


};
