module.exports = function(app){
	
	var user = require('../controllers/user.controller');
	app.post('/login', user.login);
	app.get('/assets', user.addAssets);
	app.get('/player', user.playerRender);
	app.get('/group', user.groupRender);
	app.post('/group/add', user.addGroup);
	app.post('/player/register', user.registerPlayer);
	app.post('/assets/uploadVideo', user.uploadVideo);
	app.post('/assets/uploadImage', user.uploadImage);
	app.get('/assets/list', user.assetsList);

};
