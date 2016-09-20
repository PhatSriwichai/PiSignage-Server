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
      var queryString = 'SELECT * FROM Player WHERE groupId = ?';
      var insert = [req.body.group];
      queryString = mysql.format(queryString, insert);
      console.log(ip.address());
      mysql.query(queryString,function(err, rows, fields){
                //console.log(pass);
          playerIP = rows;  
                if(err){
                    console.log(err);
                }else{
                    console.log(rows[0].ip);
                    var play = rows;
                    console.log("out: "+play);
                    queryString = 'SELECT * FROM AddPlaylist, Assets, Playlist \
                                      WHERE AddPlaylist.playlistId=? and AddPlaylist.assetsId = Assets.assetsId and Playlist.playlistId=?';
                    insert = [req.body.playlist, req.body.playlist];
                    queryString = mysql.format(queryString, insert);

                    mysql.query(queryString,function(err, rows, fields){
                              //console.log(pass);
                        if(err){
                            console.log(err);
                        }else{
                            var i;
                            var j; 
                            for(i=0; i<play.length; i++){
                              var mac = play[i].playerMac.toLowerCase();
                              
                              var package = [];
                              var listFile = [];
                              var listFormat = [];
                                for(j=0; j<rows.length; j++){
                                  var fileName = '';
                                  
                                    if(rows[j].format == 'url'){
                                        fileName = "http://"+ip.address()+":"+server.address().port+
                                                  "/assets/"+rows[j].assetsName;
                                        listFile.push(fileName);
                                        listFormat.push('url');
                                        
                                    }else{
                                        fileName = rows[j].assetsName;
                                        listFile.push(fileName);
                                        listFormat.push('file'); 
                                        
                                    }
                                    
                                    
                                   
                                    
                                    //console.log("send "+fileName+" to "+mac); 
                                }
                                package.push(listFile);
                                package.push(listFormat);
                                console.log(listFormat);
                                console.log(listFile);
                                console.log(package);
                                console.log(mac);
                                io.emit(mac+"_check", package, rows[0].playlistName);
                                io.emit(mac+"_control", rows[0].playlistName);
                            }
                        }
                    });
                }
      });
      //var queryString = 'INSERT INTO Assets(assetsName, ownId) VALUES(\''+req.files.file.name+'\','+req.session.userId+')';
      
      res.redirect('back');
  });


};
