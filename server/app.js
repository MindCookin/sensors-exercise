"use strict";

const path = require('path');
const express = require('express');
const multer = require('multer');
const streamBuffers = require('stream-buffers');
const csv = require('csv-parser');

const storage = multer.memoryStorage();
const upload = multer({storage});
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client/dist', 'index.html'))
})

app.post('/files', upload.array('myfile'), (req, res) => {

  var stream = new streamBuffers.ReadableStreamBuffer({
    frequency: 10,
    chunkSize: 2048
  }); 

  for (var file of req.files){
    stream.put(file.buffer)
  }

  stream
    .pipe(csv())
    .on('data', (data) => {
      console.log(data);
    });
})

app.listen(3000, () => {
  console.log('listening on 3000');
})
