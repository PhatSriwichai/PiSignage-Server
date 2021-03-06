var os = require('os');
var fs = require('fs');
var md5 = require('MD5');
var ffmpeg = require('fluent-ffmpeg');

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

   	var queryString = 'SELECT * FROM User WHERE username=\''+req.body.username+'\' and password=\''+md5(req.body.password)+'\' LIMIT 1';
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

exports.logout = function(req, res){
    req.session.userId = null;
    req.session.username = null;
    res.redirect('/');
};

exports.addAssets = function(req, res){
	   var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    if(req.session.userId == null)  res.redirect('/');
    else res.sendFile(pathView + '/views/assets_upload.html');
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

    if(req.session.userId == null)  res.redirect('/');
    else res.sendFile(pathView + '/views/assetsList.html');
    //var assetsList = "Test";
    //req.body.document.getElementById("list").innerHTML=assetsList;
    //};
    //res.sendFile('./app/views/assets_upload.html');
};



exports.setting = function(req, res){
	   var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    if(req.session.userId == null)  res.redirect('/');
    else res.sendFile(pathView + '/views/setting.html');
    //console.log(req.body.textTest);
    //var assetsList = "Test";
    //req.body.document.getElementById("list").innerHTML=assetsList;
    //};
    //res.sendFile('./app/views/assets_upload.html');
};


exports.home = function(req, res){
	  var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    if(req.session.userId == null)  res.redirect('/');
    else res.sendFile(pathView + '/views/index.html');
    //console.log(req.body.textTest);
    //var assetsList = "Test";
    //req.body.document.getElementById("list").innerHTML=assetsList;
    //};
    //res.sendFile('./app/views/assets_upload.html');
};


exports.uploadVideo = function(req, res){
	//console.log(req.files.file.name);
	//console.log(req.session.userId);
  console.log(req.files);
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
  var path = __dirname;
  var pathLength = path.length;
  var pathFile = path.substring(0, pathLength-15);

  /*var proc = new ffmpeg(pathFile+'public/assets/ae.mp4')
    .takeScreenshots({
      count: 1,
      timemarks: ['10']
    }, pathFile+'public/assets/thumbnail', function(err){
      if(err){
        console.log(err);
      }
  });*/

  var thumb = require('video-thumb');
  thumb.extract(pathFile+'public/assets/'+req.files.file.name, pathFile+'public/assets/thumbnail/'+req.files.file.name+'.png', 
    '00:00:10', '200x125', function(err){
    if(err){
      console.log(err);
    }
  })

  /*var thumb = require('node-thumbnail').thumb;
  thumb({
    source: pathFile+'public/assets/ae.mp4',
    destination: pathFile+'public/assets/thumbnail',
    concurrency: 4
  }, function(err){
      if(err){
        console.log(err);
      }
  });*/

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
  var path = __dirname;
  var pathLength = path.length;
  var pathFile = path.substring(0, pathLength-15);

  /*var thumb = require('node-thumbnail').thumb;
  thumb({
    source: pathFile+'public/assets/'+req.files.file.name,
    destination: pathFile+'public/assets/thumbnail/'+req.files.file.name+'.png',
    concurrency: 4
  }, function(err){
      if(err){
        console.log(err);
      }
  });*/
  var jimp = require('jimp');

  jimp.read(pathFile+'public/assets/'+req.files.file.name, function(err, lenna){
    if(err) throw err;
    lenna.resize(200, 125)
          .write(pathFile+'public/assets/thumbnail/'+req.files.file.name+".png");
  });

  res.redirect('back');
};

exports.uploadStream = function(req, res){
  //console.log(req.files.file.name);
  //console.log(req.session.userId)

  var db = require('../models/connectdb');
  var mysql = db.connectdb();

  var path = __dirname;
  var pathLength = path.length;
  var pathFile = path.substring(0, pathLength-15);
  var name = req.body.name+".txt";
  var url = req.body.streamURL;
  var from = req.body.from;
  //var queryString = 'INSERT INTO Assets(assetsName, ownId) VALUES(\''+req.files.file.name+'\','+req.session.userId+')';
  var queryString = 'INSERT INTO ??(??,??,??,??,??) VALUES(?, NOW(), ?, ?, ?)';
  var insert = ['Assets', 'assetsName', 'time','type', 'url', 'ownId', name, from, url, req.session.userId];
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
  fs.writeFile(pathFile+"public/assets/"+name, url, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("add "+name);
      }
  });

  res.redirect('back');
};

exports.updateStream = function(req, res){
  //console.log(req.files.file.name);
  //console.log(req.session.userId)

  var db = require('../models/connectdb');
  var mysql = db.connectdb();

  var path = __dirname;
  var pathLength = path.length;
  var pathFile = path.substring(0, pathLength-15);
  var name = req.body.name+".txt";
  var url = req.body.streamURL;
  var from = req.body.from;
  //var queryString = 'INSERT INTO Assets(assetsName, ownId) VALUES(\''+req.files.file.name+'\','+req.session.userId+')';
  var queryString = 'SELECT * FROM Assets WHERE assetsId=?';
  var insert = [req.body.assetsId];
  queryString = mysql.format(queryString, insert);

  mysql.query(queryString,
        function(err, rows, fields){
            //console.log(pass);
            if(err){
                console.log(err);
            }else{
              try{

                fs.unlinkSync(pathFile+"public/assets/"+rows[0].assetsName);
              }catch(err){
                console.log(err);
              }
            }
        }
  );

  queryString = 'UPDATE Assets SET assetsName=?, url=?, type=? WHERE assetsId=?';
  var insert = [name, url, from, req.body.assetsId];
  queryString = mysql.format(queryString, insert);

  mysql.query(queryString,
        function(err, result){
            //console.log(pass);
            if(err){
                console.log(err);
            }else{
                console.log('update assets');
            }
        }
  );
  
  
  fs.writeFile(pathFile+"public/assets/"+name, url, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("add "+name);
      }
  });
  

  res.redirect('back');
};

exports.playerRender = function(req, res){
 var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    if(req.session.userId == null)  res.redirect('/');
    else res.sendFile(pathView + '/views/player.html');
};

exports.groupRender = function(req, res){
 var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
   
    if(req.session.userId == null)  res.redirect('/');
    else res.sendFile(pathView + '/views/group.html');
};

exports.groupeditRender = function(req, res){
 var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
   
    if(req.session.userId == null)  res.redirect('/');
    else res.sendFile(pathView + '/views/group_edit.html');
};

exports.groupPlayer = function(req, res){
 var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
   
    if(req.session.userId == null)  res.redirect('/');
    else res.sendFile(pathView + '/views/group_player.html');
};

exports.deploy = function(req, res){
    console.log(req.body.group);
    console.log(req.body.playlist);
    res.redirect('back');
};

exports.regSchedule = function(req, res){
    var db = require('../models/connectdb');
    var mysql = db.connectdb();

    var queryString = 'INSERT INTO Schedule(??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?)';
    var insert = ['dateStart', 'dateEnd', 'timeStart', 'timeEnd', 'playlistId', 'groupId',
        req.body.dateStart, req.body.dateEnd, req.body.timeStart, req.body.timeEnd, req.body.playlistToSch,
        req.body.groupId];
    queryString = mysql.format(queryString, insert);

    mysql.query(queryString,
          function(err, result){
              //console.log(pass);
              if(err){
                  console.log(err);
              }else{
                  console.log('added new Schedule');
              }
          }
    );
  
  res.redirect('back');
}

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
    if(req.session.userId == null)  res.redirect('/');
    else res.sendFile(pathView + '/views/playlist.html');
};

exports.playListeditRender = function(req, res){
 var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    if(req.session.userId == null)  res.redirect('/');
    else res.sendFile(pathView + '/views/playlist_edit.html');
};

exports.playereditRender = function(req, res){
 var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    if(req.session.userId == null)  res.redirect('/');
    else res.sendFile(pathView + '/views/player_edit.html');
};

exports.addPlayList = function(req, res){
  var db = require('../models/connectdb');
  var mysql = db.connectdb();

  var queryString = 'INSERT INTO ??(??,??,??) VALUES(?,?,?)';
  var insert = ['Playlist', 'playlistName', 'description', 'layout', req.body.add, req.body.description, 1];
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
    req.session.playListId = req.query.id;
    //console.log(pathView);
    if(req.session.userId == null)  res.redirect('/');
    else res.sendFile(pathView + '/views/playlistOrder.html');
};

exports.showAsset = function(req, res){
    var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    if(req.session.userId == null)  res.redirect('/');
    else res.sendFile(pathView + '/views/show.html');
};

exports.addToPlaylist = function(req, res){
    var db = require('../models/connectdb');
    var mysql = db.connectdb();

    var queryString = 'SELECT * FROM AddPlaylist WHERE playlistId = ?';
    var insert = [req.session.playListId];
    queryString = mysql.format(queryString, insert);

    mysql.query(queryString,
          function(err, rows, fields){
              //console.log(pass);
              if(err){
                  console.log(err);
              }else{
                  var queryString = 'DELETE FROM AddPlaylist WHERE playlistId = ?';
                  var insert = [req.session.playListId];
                  queryString = mysql.format(queryString, insert);

                  mysql.query(queryString,
                        function(err, result){
                            //console.log(pass);
                            if(err){
                                console.log(err);
                            }else{
                                //console.log('delete playlist id '+req.session.id);
                            }
                        }
                  );


                    var assets_id = req.body.a; 
                    var slide_id = req.body.as;
                    var time_sec = req.body.time;
                    console.log(time_sec);
                     var time_secs = req.body.times;

                    var l_id = null;
                    if(rows.length > 0){
                      l_id = rows[0].layoutId;
                    }
                    console.log(req.body.format);
                    if(l_id == null) l_id = 1;
                    
                    if(assets_id instanceof Array){
                        console.log("is Array");
                        for(var i=0; i<assets_id.length; i++){
                          
                          var queryString = 'INSERT INTO AddPlaylist(??, ??, ??, ??, ??, ??) VALUES(?, ?, ?, ?, ?, ?)';
                          var insert = ['ownId', 'format', 'time_sec', 'playlistId', 'assetsId', 'position', 
                          req.session.userId, req.body.format[i],  time_sec[i], req.session.playListId,assets_id[i], 'M'];
                          queryString = mysql.format(queryString, insert);

                          mysql.query(queryString,
                                function(err, result){
                                    //console.log(pass);
                                    if(err){
                                        console.log(err);
                                    }else{
                                        console.log('added');
                                    }
                                }
                          );
                        }
                    }else{
                          console.log("no Array");
                          console.log(req.body.format);
                          console.log(assets_id);
                          var format = '';
                          if(req.body.format instanceof Array){
                              format = req.body.format[0];

                          }else{
                              format = req.body.format;
                          }
                          console.log("format ="+format);
                          var queryString = 'INSERT INTO AddPlaylist(??, ??, ??, ??, ??, ??) VALUES(?, ?, ?, ?, ?, ?)';
                          var insert = ['ownId', 'format', 'time_sec', 'playlistId', 'assetsId', 'position', 
                                        req.session.userId, format, time_sec, req.session.playListId, assets_id, 'M'];
                          queryString = mysql.format(queryString, insert);

                          mysql.query(queryString,
                                function(err, result){
                                    //console.log(pass);
                                    if(err){
                                        console.log(err);
                                    }else{
                                        console.log('added');
                                    }
                                }
                          );
                    }
                    if(slide_id != null){
                        if(slide_id instanceof Array){
                          var format = '';
                          if(req.body.format instanceof Array){
                              format = req.body.formats[0];

                          }else{
                              format = req.body.formats;
                              console.log("slide no array");
                          }
                          for(var i=0; i<slide_id.length; i++){
                            var queryString = 'INSERT INTO AddPlaylist(??, ??, ??, ??, ??, ??) VALUES(?, ?, ?, ?, ?, ?)';
                            var insert = ['ownId', 'format', 'time_sec', 'playlistId', 'assetsId', 'position', req.session.userId, 
                                        req.body.formats[i], time_secs[i], req.session.playListId, slide_id[i], 'S'];
                            queryString = mysql.format(queryString, insert);

                            mysql.query(queryString,
                                  function(err, result){
                                      //console.log(pass);
                                      if(err){
                                          console.log(err);
                                      }else{
                                          console.log('added');
                                      }
                                  }
                            );
                          }
                      }else{
                            var format = 'file';
                            console.log(req.body.formats);
                            //if(req.body.formats instanceof Array){
                                //console.log(req.body.formats);
                            ////    format = req.body.formats[0];    
                            //}else{
                            //    format = req.body.formats;
                            //}
                            console.log("s"+slide_id);
                            console.log(format);
                            var queryString = 'INSERT INTO AddPlaylist(??, ??, ??, ??, ??, ??) VALUES(?, ?, ?, ?, ?, ?)';
                            var insert = ['ownId', 'format', 'time_sec', 'playlistId', 'assetsId', 'position', 
                                          req.session.userId, format, time_secs, req.session.playListId, slide_id, 'S'];
                            queryString = mysql.format(queryString, insert);

                            mysql.query(queryString,
                                  function(err, result){
                                      //console.log(pass);
                                      if(err){
                                          console.log(err);
                                      }else{
                                          console.log('added');
                                      }
                                  }
                            );
                      }
                    }
                    
                    
              }
          }
    );
   
    /*
    var assets_id = req.body.a;
  
    var i;
    if(assets_id instanceof Array){

        for(i=0; i<assets_id.length; i++){
          var queryString = 'INSERT INTO AddPlaylist(??, ??, ??, ??, ??, ??) VALUES(?, ?, ?, ?, ?, ?)';
          var insert = ['ownId', 'format', 'playlistId', 'assetsId', 'layoutId', 'position', req.session.userId, 
                      req.body.format[i], req.session.playListId, assets_id[i], l_id, 'M'];
          queryString = mysql.format(queryString, insert);

          mysql.query(queryString,
                function(err, result){
                    //console.log(pass);
                    if(err){
                        console.log(err);
                    }else{
                        console.log('added');
                    }
                }
          );
        }
    }else{
          var queryString = 'INSERT INTO AddPlaylist(??, ??, ??, ??, ??) VALUES(?, ?, ?, ?, ?)';
          var insert = ['ownId', 'playlistId', 'assetsId', 'layoutId', 'position', req.session.userId, 
                        req.session.playListId, assets_id, 1, 'M'];
          queryString = mysql.format(queryString, insert);

          mysql.query(queryString,
                function(err, result){
                    //console.log(pass);
                    if(err){
                        console.log(err);
                    }else{
                        console.log('added');
                    }
                }
          );
    }
*/
    
    
    
    
    res.redirect('back');
};

exports.editRender = function(req, res){
    var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    if(req.session.userId == null)  res.redirect('/');
    else res.sendFile(pathView + '/views/assets_edit.html');
};

exports.deleteAssets = function(req, res){
    var db = require('../models/connectdb');
    var mysql = db.connectdb();
    var fs = require('fs');
    var assets_id = req.body.a;
    var i, j;

    var queryString = 'SELECT * FROM Assets';
    mysql.query(queryString,
           function(err, rows, fields){
                  //console.log(pass);
              if(err){
                   console.log(err);
              }else{
                if(assets_id instanceof Array){
                   for(i = 0; i < assets_id.length; i++){
                        for(j = 0; j < rows.length; j++){
                            if(assets_id[i] == rows[j].assetsId){
                                var path = __dirname;
                                var pathLength = path.length;
                                var pathFile = path.substring(0, pathLength-15)+"public/assets/"+rows[j].assetsName;
                                fs.unlinkSync(pathFile);
                                if(rows[j].type == 'video' || rows[j].type == 'image'){
                                  pathFile = path.substring(0, pathLength-15)+"public/assets/thumbnail/"+rows[j].assetsName+".png";
                                  fs.unlinkSync(pathFile);
                                }
                                
                            }
                        }
                      
                   }
                }else{
                    for(j = 0; j < rows.length; j++){
                      if(assets_id == rows[j].assetsId){
                          var path = __dirname;
                          var pathLength = path.length;
                          var pathFile = path.substring(0, pathLength-15)+"public/assets/"+rows[j].assetsName;
                          fs.unlinkSync(pathFile);
                          if(rows[j].type == 'video' || rows[j].type == 'image'){
                            pathFile = path.substring(0, pathLength-15)+"public/assets/thumbnail/"+rows[j].assetsName+".png";
                            fs.unlinkSync(pathFile);
                          }
                      }
                  }
                }
              }
           }
   );
    if(assets_id instanceof Array){
      for(i = 0; i < assets_id.length; i++){
          var queryString = 'DELETE FROM AddPlaylist WHERE assetsId = ?';
          var insert = [assets_id[i]];
          queryString = mysql.format(queryString, insert);

          mysql.query(queryString,
                function(err, result){
                    //console.log(pass);
                    if(err){
                        console.log(err);
                    }else{
                        console.log('delete AddtoPlaylistt id '+ assets_id[i]);
                    }
                }
          );
      
      }
      for(i = 0; i < assets_id.length; i++){
        var queryString = 'DELETE FROM Assets WHERE assetsId = ?';
        var insert = [assets_id[i]];
        queryString = mysql.format(queryString, insert);

        mysql.query(queryString,
              function(err, result){
                  //console.log(pass);
                  if(err){
                      console.log(err);
                  }else{
                      console.log('delete Asset id '+ assets_id[i]);
                  }
              }
        );
    
      }
    }else{
      var queryString = 'DELETE FROM AddPlaylist WHERE assetsId = ?';
      var insert = [assets_id];
      queryString = mysql.format(queryString, insert);

      mysql.query(queryString,
            function(err, result){
                //console.log(pass);
                if(err){
                    console.log(err);
                }else{
                     console.log('delete AddtoPlaylistt id '+ assets_id);
                 }
            }
      );
      var queryString = 'DELETE FROM Assets WHERE assetsId = ?';
        var insert = [assets_id];
        queryString = mysql.format(queryString, insert);

        mysql.query(queryString,
              function(err, result){
                  //console.log(pass);
                  if(err){
                      console.log(err);
                  }else{
                      console.log('delete Asset id '+ assets_id);
                  }
              }
        );
    }
    

    

 
    res.redirect('back');
};


exports.deletePlaylist = function(req, res){
    var db = require('../models/connectdb');
    var mysql = db.connectdb();
    var fs = require('fs');
    var playlist_id = req.body.a;
    var i, j;

    var queryString = 'SELECT * FROM Playlist';

    
    for(i = 0; i < playlist_id.length; i++){
        var queryString = 'DELETE FROM AddPlaylist WHERE assetsId = ?';
        var insert = [playlist_id[i]];
        queryString = mysql.format(queryString, insert);

        mysql.query(queryString,
              function(err, result){
                  //console.log(pass);
                  if(err){
                      console.log(err);
                  }else{
                      console.log('delete AddtoPlaylistt id '+ playlist_id[i]);
                  }
              }
        );
    
    }

    for(i = 0; i < playlist_id.length; i++){
        var queryString = 'DELETE FROM Playlist WHERE playlistId = ?';
        var insert = [playlist_id[i]];
        queryString = mysql.format(queryString, insert);

        mysql.query(queryString,
              function(err, result){
                  //console.log(pass);
                  if(err){
                      console.log(err);
                  }else{
                      console.log('delete Playlist id '+ playlist_id[i]);
                  }
              }
        );
    
    }

 
    res.redirect('back');
};

exports.deletePlayer = function(req, res){
    var db = require('../models/connectdb');
    var mysql = db.connectdb();
    var fs = require('fs');
    var player_id = req.body.a;
    var i, j;

    var queryString = 'SELECT * FROM Player';

    

    for(i = 0; i < player_id.length; i++){
        var queryString = 'DELETE FROM Player WHERE playerId = ?';
        var insert = [player_id[i]];
        queryString = mysql.format(queryString, insert);

        mysql.query(queryString,
              function(err, result){
                  //console.log(pass);
                  if(err){
                      console.log(err);
                  }else{
                      console.log('delete Playlist id '+ player_id[i]);
                  }
              }
        );
    
    }

 
    res.redirect('back');
};

exports.deleteGroup = function(req, res){
    var db = require('../models/connectdb');
    var mysql = db.connectdb();
    var fs = require('fs');
    var group_id = req.body.a;
    var i, j;

    var queryString = 'SELECT * FROM Groups';

    
    for(i = 0; i < group_id.length; i++){
        var queryString = 'DELETE FROM Player WHERE groupId = ?';
        var insert = [group_id[i]];
        queryString = mysql.format(queryString, insert);

        mysql.query(queryString,
              function(err, result){
                  //console.log(pass);
                  if(err){
                      console.log(err);
                  }else{
                      console.log('delete Player id '+ group_id[i]);
                  }
              }
        );
    
    }

    for(i = 0; i < group_id.length; i++){
        var queryString = 'DELETE FROM Groups WHERE groupId = ?';
        var insert = [group_id[i]];
        queryString = mysql.format(queryString, insert);

        mysql.query(queryString,
              function(err, result){
                  //console.log(pass);
                  if(err){
                      console.log(err);
                  }else{
                      console.log('delete Groups id '+ group_id[i]);
                  }
              }
        );
    
    }

 
    res.redirect('back');
};

exports.deleteGroupplayer = function(req, res){
    var db = require('../models/connectdb');
    var mysql = db.connectdb();
    var fs = require('fs');
    var group_id = req.body.a;
    var i, j;

    var queryString = 'SELECT * FROM Groups';

    
    for(i = 0; i < group_id.length; i++){
        var queryString = 'DELETE FROM Player WHERE groupId = ?';
        var insert = [group_id[i]];
        queryString = mysql.format(queryString, insert);

        mysql.query(queryString,
              function(err, result){
                  //console.log(pass);
                  if(err){
                      console.log(err);
                  }else{
                      console.log('delete Player id '+ group_id[i]);
                  }
              }
        );
    
    }

    for(i = 0; i < group_id.length; i++){
        var queryString = 'DELETE FROM Groups WHERE groupId = ?';
        var insert = [group_id[i]];
        queryString = mysql.format(queryString, insert);

        mysql.query(queryString,
              function(err, result){
                  //console.log(pass);
                  if(err){
                      console.log(err);
                  }else{
                      console.log('delete Groups id '+ group_id[i]);
                  }
              }
        );
    
    }

 
    res.redirect('back');
};

exports.setTicker = function(req, res){
    var db = require('../models/connectdb');
    var mysql = db.connectdb();

    var queryString = 'DELETE FROM Ticker WHERE playlistId = ?';
    var insert = [req.query.id];
    queryString = mysql.format(queryString, insert);

    mysql.query(queryString,
          function(err, result){
              //console.log(pass);
              if(err){
                  console.log(err);
              }else{
                  console.log('delete ticker playlistId '+req.query.id);
              }
          }
    );

    queryString = 'INSERT INTO Ticker(??, ??, ??) VALUES(?, ?, ?)';
    insert = ['tickerMessage', 'behavior', 'playlistId', req.body.ticker, req.body.behavior, req.query.id];
    queryString = mysql.format(queryString, insert);

    mysql.query(queryString,
          function(err, result){
              //console.log(pass);
              if(err){
                  console.log(err);
              }else{
                  console.log('added');
              }
          }
    );
    //db.close();
    res.redirect('back');
}

exports.setLayout = function(req, res){
    var db = require('../models/connectdb');
    var mysql = db.connectdb();
  
    var queryString = 'UPDATE Playlist SET layout=? WHERE playlistId = ?';
    var insert = [req.body.select, req.query.id];
    queryString = mysql.format(queryString, insert);
    console.log(req.body.select);
    mysql.query(queryString,
          function(err, result){
              //console.log(pass);
              if(err){
                  console.log(err);
              }else{
                  console.log('update playlistId '+req.query.id);
              }
          }
    );

    //db.close();

    res.redirect('back');
}
