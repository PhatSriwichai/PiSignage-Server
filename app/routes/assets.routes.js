module.exports = function(app){
	app.post('/upload', function(req, res) {
    	res.send(req.files);
	});
	return app;
};


