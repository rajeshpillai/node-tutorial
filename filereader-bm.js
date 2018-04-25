let fs = require('fs');

let args = {
    '-h': commandUsage,
    '-r': readFile
};

function commandUsage() {
    console.log(args);
}

function readFile(file) {
    if (file && file.length) {
        console.log('Reading: ', file);
        console.time('read');
        let stream = fs.createReadStream(file);
        stream.on('end', function () {
            console.log("\n");
            console.timeEnd('read');
        });
        stream.pipe(process.stdout);
    } else {
        console.error('Please provide a file with the -r option');
        process.exit(1);  // non-zero menas an error occured
    }
}

let flag = process.argv[2];
let fileName = process.argv[3]; 

if (!flag) {
    console.log("Usage: filereader-bm [-h/-r] [filename] \n\n");
    process.exit(1);
}

switch(flag) {
    case '-h':
        commandUsage();
        break;

    case '-r':
        readFile(fileName);
        break;
}