module.exports = function(app){
	
	var user = require('../controllers/user.controller');
	app.get('/home', user.home);
	app.get('/assets/list', user.assetsList);
	app.get('/assets', user.addAssets);
	app.get('/assets/edit', user.editRender);
	app.get('/player', user.playerRender);
	app.get('/player/edit', user.playereditRender);
	app.get('/group', user.groupRender);
	app.get('/group/edit', user.groupeditRender);
	app.get('/group_player', user.groupPlayer);
	app.get('/playlist', user.playListRender);
	app.get('/playlist/edit', user.playListeditRender);
	app.get('/playlistList', user.playListOrder);
	app.get('/show', user.showAsset);
	app.get('/setting', user.setting);
	//app.get('/deploy', user.deploy);
	app.get('/logout', user.logout);
	
	app.post('/group/add', user.addGroup);
	app.post('/group/edit/delete', user.deleteGroup);
	app.post('/playlist/add', user.addPlayList);
	app.post('/playlist/addTo', user.addToPlaylist);
	app.post('/playlist/edit/delete', user.deletePlaylist);
	app.post('/playlist/ticker', user.setTicker);
	app.post('/playlist/layout', user.setLayout);
	app.post('/player/register', user.registerPlayer);
	app.post('/player/edit/delete', user.deletePlayer);
	app.post('/assets/uploadVideo', user.uploadVideo);
	app.post('/assets/uploadImage', user.uploadImage);
	app.post('/assets/uploadStream', user.uploadStream);
	app.post('/assets/edit/delete', user.deleteAssets);
	app.post('//edit/delete', user.deleteAssets);
	app.post('/login', user.login);
	//app.post('/deploy', user.deploy);
	

	

};
