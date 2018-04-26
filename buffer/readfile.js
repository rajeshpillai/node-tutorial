let fs = require('fs');
fs.readFile('./phone.txt', function (err, buf) {
  console.log(buf.toString('ascii'));
});
