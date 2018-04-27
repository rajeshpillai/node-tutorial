var fs = require('fs');
var zlib = require('zlib');
var file = process.argv[2];

fs.readFile(file, function(err, buffer) {
    zlib.gzip(buffer, function(err, buffer) {
        fs.writeFile(file + '.gz', buffer, function(err) {
            console.log('File successfully compressed');
        });
    });
});