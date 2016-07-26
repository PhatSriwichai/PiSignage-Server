exports.createtable = function(req, res){
	
    var mysql = require('mysql');
    var connection = mysql.createConnection({
    	host	: 'localhost',
    	user	: 'root',
    	password: 'meroot',
    	database: 'pisignage'
    });
    
    //var query = "CREATE TABLE User(userId int, userName VARCHAR(20) password CHAR(8), PRIMARY KEY(userId))"

    connection.query('CREATE TABLE User(\
    	userId int NOT NULL, \
    	userName VARCHAR(20) NOT NULL,\
		password CHAR(8) NOT NULL,\
		PRIMARY KEY(userId))',
    	function(err, result){
    		if(err){
    			console.log(err);
    		}else{
    			console.log("Table User created.");
    		}
    	}
    );
    connection.query('CREATE TABLE Playlist(\
    	playlistId int NOT NULL, \
    	playlistName VARCHAR(100) NOT NULL,\
		PRIMARY KEY(playlistId))',
    	function(err, result){
    		if(err){
    			console.log(err);
    		}else{
    			console.log("Table Playlist created.");
    		}
    	}
    );
    connection.query('CREATE TABLE Player(\
    	playerId int NOT NULL, \
    	playerMac VARCHAR(16) NOT NULL,\
		groups VARCHAR(20) NOT NULL,\
		ownId int NOT NULL,\
		PRIMARY KEY(playerId),\
		FOREIGN KEY(ownId) REFERENCES User(userId))',
    	function(err, result){
    		if(err){
    			console.log(err);
    		}else{
    			console.log("Table Player created.");
    		}
    	}
    );
    connection.query('CREATE TABLE Assets(\
    	assetsId int NOT NULL, \
    	assetsName VARCHAR(100) NOT NULL,\
		PRIMARY KEY(assetsId))',
    	function(err, result){
    		if(err){
    			console.log(err);
    		}else{
    			console.log("Table Assets created.");
    		}
    	}
    );
    connection.query('CREATE TABLE AddPlaylist(\
    	apId int NOT NULL,\
    	ownId int NOT NULL,\
    	playlistId int NOT NULL,\
    	assetsId int NOT NULL,\
    	PRIMARY KEY(apId),\
    	FOREIGN KEY(ownId) REFERENCES User(userId),\
    	FOREIGN KEY(playlistId) REFERENCES Playlist(playlistId),\
    	FOREIGN KEY(assetsId) REFERENCES Assets(assetsId))',
    	function(err, result){
    		if(err){
    			console.log(err);
    		}else{
    			console.log('Table AddPlaylist created.')
    		}
    	}
    );

};