module.exports = function(app){
	
	var user = require('../controllers/user.controller');
	app.get('/assets/list', user.assetsList);
	app.get('/assets', user.addAssets);
	app.get('/player', user.playerRender);
	app.get('/group', user.groupRender);
	app.get('/playlist', user.playListRender);
	app.get('/playlist/list', user.playListOrder);

	app.post('/group/add', user.addGroup);
	app.post('/playlist/add', user.addPlayList);
	app.post('/player/register', user.registerPlayer);
	app.post('/assets/uploadVideo', user.uploadVideo);
	app.post('/assets/uploadImage', user.uploadImage);
	app.post('/login', user.login);
	

};
