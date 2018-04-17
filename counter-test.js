var counter = require('./counter');

console.log(counter.value);
counter.value++;

// Lets us require the module one more time

var counter1 = require('./counter');
console.log(counter.value);