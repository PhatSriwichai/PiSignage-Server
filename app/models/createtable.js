exports.createtable = function(req, res){
	var md5 = require('MD5');
    var mysql = require('mysql');
    var connection = mysql.createConnection({
    	host	: 'localhost',
    	user	: 'root',
    	password: 'meroot',
        charset : "utf8_general_ci" ,
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
    connection.query('CREATE TABLE Layout(\
        layoutId int NOT NULL AUTO_INCREMENT, \
        layoutCode VARCHAR(5) NOT NULL,\
        layoutName VARCHAR(150) NOT NULL,\
        PRIMARY KEY(layoutId))',
        function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log("Table Layout created.");
            }
        }
    );
    connection.query('CREATE TABLE Playlist(\
    	playlistId int NOT NULL AUTO_INCREMENT, \
    	playlistName VARCHAR(100) NOT NULL,\
        description VARCHAR(100),\
        layout int NOT NULL,\
		PRIMARY KEY(playlistId),\
        FOREIGN KEY(layout) REFERENCES Layout(layoutId))',
    	function(err, result){
    		if(err){
    			console.log(err);
    		}else{
    			console.log("Table Playlist created.");
    		}
    	}
    );
    connection.query('CREATE TABLE Ticker(\
        tickerId int NOT NULL AUTO_INCREMENT, \
        tickerMessage VARCHAR(500) NOT NULL,\
        behavior VARCHAR(10) NOT NULL,\
        playlistId int NOT NULL, \
        PRIMARY KEY(tickerId),\
        FOREIGN KEY(playlistId) REFERENCES Playlist(playlistId))',
        function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log("Table Ticker created.");
            }
        }
    );
    connection.query('CREATE TABLE Groups(\
        groupId int NOT NULL AUTO_INCREMENT, \
        groupName VARCHAR(100) NOT NULL,\
        description VARCHAR(100),\
        PRIMARY KEY(groupId))',
        function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log("Table Groups created.");
            }
        }
    );
    connection.query('CREATE TABLE Player(\
    	playerId int NOT NULL AUTO_INCREMENT, \
    	playerMac VARCHAR(17) NOT NULL,\
        status VARCHAR(10),\
        ip CHAR(16),\
        name VARCHAR(100),\
        location VARCHAR(100),\
		groupId int,\
		ownId int NOT NULL,\
		PRIMARY KEY(playerId),\
        FOREIGN KEY(groupId) REFERENCES Groups(groupId),\
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
        time DATETIME NOT NULL,\
        type VARCHAR(20) NOT NULL,\
        url VARCHAR(1000),\
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
        format VARCHAR(10) NOT NULL,\
        position VARCHAR(3) NOT NULL,\
        time_sec int,\
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
    connection.query('CREATE TABLE Schedule(\
        scheduleId int NOT NULL AUTO_INCREMENT,\
        dateStart DATE NOT NULL,\
        dateEnd DATE NOT NULL,\
        timeStart TIME NOT NULL,\
        timeEnd TIME NOT NULL,\
        playlistId int NOT NULL,\
        groupId int NOT NULL,\
        PRIMARY KEY(scheduleId),\
        FOREIGN KEY(groupId) REFERENCES Groups(groupId),\
        FOREIGN KEY(playlistId) REFERENCES Playlist(playlistId))',
        function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log('Table Schedule created.')
            }
        }
    );

    var pass = md5('admin');

    connection.query('INSERT INTO User VALUES(1, \'admin\',\''+pass+'\')',
        function(err, result){
            console.log(pass);
            if(err){
                console.log(err);
            }else{
                console.log('User admin added.');
            }
        }
    );
    connection.query('INSERT INTO Layout VALUES(1,\'1\', \'Single Zone Display\')',
        function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log('Layout 1 added.');
            }
        }
    );
    connection.query('INSERT INTO Layout VALUES(2, \'2a\', \'Two Zone with Main Zone on right\')',
        function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log('Layout 2a added.');
            }
        }
    );
    connection.query('INSERT INTO Layout VALUES(3, \'2b\', \'Two Zone with Main Zone on left\')',
        function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log('Layout 2b added.');
            }
        }
    );
    connection.query('INSERT INTO Layout VALUES(4, \'3a\', \'Two Zone with Main Zone on bottom\')',
        function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log('Layout 3a added.');
            }
        }
    );
    connection.query('INSERT INTO Layout VALUES(5, \'3b\', \'Two Zone with Main Zone on top\')',
        function(err, result){
            if(err){
                console.log(err);
            }else{
                console.log('Layout 3b added.');
            }
        }
    );

};