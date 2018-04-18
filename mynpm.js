let fs = require('fs');

let command = process.argv[2];
let flag = process.argv[3]; 

if (!command) {
    console.log("Usage: mynpm init -y\n\n");
    process.exit(-1);
}

let fileName = 'mypackage.json';

console.log(command, flag);

switch (command.toLowerCase()) {
    case "init":
        init(flag);
        break;
    default:
        break;
}

function init (flag) {
    if (flag === '-y') {
        defaultInit();
    }
}

function defaultInit() {
    let content = {
        name: "default"
    }
    fs.writeFile(fileName, JSON.stringify(content), function opened(err, fd) {
        if (err) { throw err; };
        console.log("Config file created.");
    });
}