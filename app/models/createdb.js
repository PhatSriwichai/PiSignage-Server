exports.createdb = function(req, res){
	
    var mysql = require('mysql');
    var connection = mysql.createConnection({
    	host	: 'localhost',
    	user	: 'root',
    	password: 'meroot'
    	//database: 'pisignage'
    });
    connection.query('CREATE DATABASE pisignage',
    	function(err, result){
    		if(err){
    			console.log(err);
    		}else{
    			console.log("Database pisignage created.");
    		}
    	}
    );
    /*connection.connect(function(err){
    	if(error){
    		console.log('Error');
    	}else{
    		console.log('Connected');
    	}
    });*/
   

};