var fs = require('fs');

exports.sendToClient = function(req, res){
      var path = __dirname;
      var pathLength = path.length;
      var pathFile = path.substring(0, pathLength-15);
      fs.readFile(pathFile+"/public/assets/aaa.jpg", function(err, buf){
          if(err){
              console.log(err);
          }else{
              io.emit('file', {image: true, buffer: buf});
          }
      });
      //res.redirect('back');
          
};

