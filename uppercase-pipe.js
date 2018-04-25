/*
USAGE: cat file.txt | node uppercase-pipe.js
*/

// Tell the  stream we're ready to start reading
process.stdin.resume();   

process.stdin.setEncoding('utf8');

process.stdin.on('data', function (data) {
    process.stdout.write(data.toUpperCase());
});