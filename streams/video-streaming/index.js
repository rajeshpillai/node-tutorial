const fs = require('fs');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  fs.readFile('./index.html', (err, html) => res.end(html));
});

app.get('/videos/:videoName', (req, res, next) => {
  const { videoName } = req.params;
  const videoFile = __dirname + `/videos/${videoName}`;
  /*
    Use the fs.stat() to check for the existence of a file, along with
    some stats of the file before calling fs.open or any other file operation.
  */
  fs.stat(videoFile, (err, stats) => {
    if (err) {
      console.log(err);
      return res.status(404).end('<h1>Video Not found</h1>');
    }
    
    /* Get the range the browser is asking for.  The range
      tell u swhat part of the file the browser wants in bytes

      A byte range request generally looks like this:
        range: bytes=0-100
      There are variations to this, but for us this is enough to understand.

      NOTE:  When the download starts, the range starts from 0, and subsequently
      the next set of bytes are requested.
    */
    const { range } = req.headers;
    console.log(`range-> ${range}`)

    // Grab the file size
    const { size } = stats;
    
    // Get the start value and convert to number
    // RANGE Format: range: bytes=0-100 -> 0 is start and 100 is end
    const positions = (range || '').replace(/bytes=/, '').split('-');
    console.log('positions: ', positions);
    const start = Number(positions[0]);
    const end = positions[1] ? parsetInt(positions[1],10) :  size - 1;

    console.log(`start-${start}, end-${end}`);

        
    // Calculate the amount of bits that we will sent back
    // to the browser

    const chunkSize = (end - start) + 1;
    console.log(`chunksize=${chunkSize}`);

    // Create the response header
    res.set({
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4'
    });
    
    // Set the status to partial content
    res.status(206);  

    /* Create the createReadStream to know how much data it 
       should read from the file.
       Passing the optional, start and end values, will read
       the range of bytes from the file instead of the entire file.
       Both start and end are inclusive and start counting at 0.

       Look at documention for more options:
       https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options
    */

    const stream = fs.createReadStream(videoFile, { start, end });

    // Once the stream is open, we pipe the data through the
    // response object.
    stream.on('open', () => {
      stream.pipe(res)
    });

    // Any error end the response
    stream.on('error', (streamErr) => res.end(streamErr));
  });
});

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Video Streaming Server running on port ${port}...`));