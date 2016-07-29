exports.createtable = function(req, res){
	var md5 = require('MD5');
    var mysql = require('mysql');
    var connection = mysql.createConnection({
    	host	: 'localhost',
    	user	: 'root',
    	password: 'meroot',
    	database: 'pisignage'
    });
    
    //var query = "CREATE TABLE User(userId int, userName VARCHAR(20) password CHAR(8), PRIMARY KEY(userId))"

    connection.query('CREATE TABLE User(\
    	userId int NOT NULL AUTO_INCREMENT, \
    	userName VARCHAR(20) NOT NULL,\
		password CHAR(32) NOT NULL,\
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
    	playlistId int NOT NULL AUTO_INCREMENT, \
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
    	playerId int NOT NULL AUTO_INCREMENT, \
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
    	assetsId int NOT NULL AUTO_INCREMENT, \
    	assetsName VARCHAR(100) NOT NULL,\
        ownId int NOT NULL, \
		PRIMARY KEY(assetsId),\
        FOREIGN KEY(ownId) REFERENCES User(userId))',
    	function(err, result){
    		if(err){
    			console.log(err);
    		}else{
    			console.log("Table Assets created.");
    		}
    	}
    );
    connection.query('CREATE TABLE AddPlaylist(\
    	apId int NOT NULL AUTO_INCREMENT,\
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
    var pass = md5('admin');

    connection.query('INSERT INTO User VALUES(1, \'admin\',\'admin\')',
        function(err, result){
            console.log(pass);
            if(err){
                console.log(err);
            }else{
                console.log('User admin added.');
            }
        }
    );

};