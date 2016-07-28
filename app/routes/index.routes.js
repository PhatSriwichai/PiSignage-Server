module.exports = function(app){
	var index = require('../controllers/index.controller');
	//var assets = require('../controllers/assets.controller');

	app.get('/',index.render);
	//app.get('/assets',assets.render);
	//app.post('/assets/upload', function(req, res) {
    //	res.send(req.files);
	//});

};