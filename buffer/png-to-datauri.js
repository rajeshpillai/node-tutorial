const fs = require('fs');

let encoding = 'base64';
let mime = 'image/png';

let fileToLoad = 'kunfupanda.png';

let data =  fs.readFileSync(fileToLoad).toString(encoding);

let uri = 'data:' + mime + ';' +  encoding + ',' + data;

console.log(uri);

