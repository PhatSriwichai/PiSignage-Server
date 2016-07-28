exports.login = function(req, res){
	
    var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);

    //res.sendFile(pathView + '/views/login.html');
   	console.log(req.body);
   	console.log(req.body.username);
   	console.log(req.body.password);
   	res.sendFile(pathView + '/views/index.html');
};