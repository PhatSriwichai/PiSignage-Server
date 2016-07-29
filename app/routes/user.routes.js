module.exports = function(app){
	
	var user = require('../controllers/user.controller');
	app.post('/login', user.login);
	app.get('/assets', user.addAssets);
	app.post('/assets/upload', user.upload);

};
