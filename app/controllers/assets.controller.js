exports.render = function(req, res){
	
    var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);
    res.sendFile(pathView + '/views/assets_upload.html');
    //};
    //res.sendFile('./app/views/assets_upload.html');
};