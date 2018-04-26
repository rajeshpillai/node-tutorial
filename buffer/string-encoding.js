let username = 'tommy';
let password = 'secret';
let authvalue = username + ':' + password;

let buf = new Buffer(authvalue);
let encoded = buf.toString('base64');

console.log(encoded);