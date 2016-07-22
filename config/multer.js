var multer = require('multer');
var fs = require('fs');

module.exports = function(app){
    app.use(multer({
        dest: __dirname + '/uploads/',
        rename: function(fieldname, filename) {
            return filename;
        },
        limits: {
            fileSize: 10000000
        },
        onFileSizeLimit: function(file) {
            console.log('Failed: ' + file.originalname + ' is limited');
            fs.unlink(file.path);
        }
    }));

    require('../app/routes/assets.routes')(app);
    return app;
};