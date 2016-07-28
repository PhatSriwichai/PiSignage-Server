exports.render = function(req, res){
	//res.send('Hello World');
    /*res.render('index',{
    	'title': 'Hello World',
    	'message': 'Yo Yo'
    });*/
    //function(req, res){
    var path = __dirname;
    var pathLength = path.length;
    var pathView = path.substring(0, pathLength-12);
    //console.log(pathView);

    
    res.sendFile(pathView + '/views/login.html');
    //};
    //res.sendFile('./app/views/assets_upload.html');
};