module.exports = function(app){
	
	var user = require('../controllers/user.controller');
	app.post('/login', user.login);

};
