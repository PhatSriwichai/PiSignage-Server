module.exports = function(app, io){
	var fs = require('fs');

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
                            var jsonString=[];
                            var count=0;
                            for(i=0; i<play.length; i++){
                                for(j=0; j<rows.length; j++){
                                    var fileName = rows[j].assetsName;
                                    jsonString.push(fileName);
                                    console.log("j = "+j);
                                    var mac = play[i].playerMac;
                                    var file = fs.readFile(pathFile+"/public/assets/"+jsonString[j], "binary",function(err, buf){
                                        
                                        if(err){
                                            console.log(err);
                                        }else{
                                            var index = j-(j-count);
                                            var type = jsonString[index].substring(jsonString[index].length-3, jsonString[index].length);
                                            io.emit(mac, jsonString[index], buf, type);
                                            //console.log(mac);
                                            count += 1;

                                        }
                                    }); 

                                }
                            }
                                
                           
                            //io.emit('file', fileName, buf);
                          
                        }
                    });
                   
                }
      });
      //var queryString = 'INSERT INTO Assets(assetsName, ownId) VALUES(\''+req.files.file.name+'\','+req.session.userId+')';
      
      res.redirect('back');
  });


};
