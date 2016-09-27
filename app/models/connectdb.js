exports.connectdb = function(req, res){
	
    var mysql = require('mysql');

    var connection = mysql.createConnection({
    	host	: 'localhost',
    	user	: 'root',
    	password: 'meroot',
    	database: 'pisignage'
    });
    connection.connect();

    return connection;
};