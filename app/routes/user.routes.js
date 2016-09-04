module.exports = function(app){
	
	var user = require('../controllers/user.controller');
	app.get('/assets/list', user.assetsList);
	app.get('/assets', user.addAssets);
	app.get('/assets/edit', user.editRender);
	app.get('/player', user.playerRender);
	app.get('/group', user.groupRender);
	app.get('/group_player', user.groupPlayer);
	app.get('/playlist', user.playListRender);
	app.get('/playlist/list', user.playListOrder);
	app.get('/show', user.showAsset);
	//app.get('/deploy', user.deploy);
	app.get('/logout', user.logout);
	
	app.post('/group/add', user.addGroup);
	app.post('/playlist/add', user.addPlayList);
	app.post('/playlist/addTo', user.addToPlaylist);
	app.post('/player/register', user.registerPlayer);
	app.post('/assets/uploadVideo', user.uploadVideo);
	app.post('/assets/uploadImage', user.uploadImage);
	app.post('/assets/edit/delete', user.deleteAssets);
	app.post('/login', user.login);
	//app.post('/deploy', user.deploy);
	

	

};
