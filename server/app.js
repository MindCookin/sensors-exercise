"use strict";

const path = require('path');
const express = require('express');
const multer = require('multer');
const streamBuffers = require('stream-buffers');
const csv = require('csv-parser');
const MongoClient = require('mongodb').MongoClient;

const storage = multer.memoryStorage();
const upload = multer({storage});
const app = express();

var db;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client/dist', 'index.html'))
})

app.get('/graph', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client/dist', 'graph.html'))
})

app.post('/graph', (req, res) => {

  db.collection('analytics')
    .find()
    .toArray((err, results) => {

      if (err) cosole.log(err);

      console.log(results);
    });
})

app.post('/files', upload.array('myfile'), (req, res) => {

  var stream = new streamBuffers.ReadableStreamBuffer({
    frequency: 10,
    chunkSize: 2048
  }); 

  for (var file of req.files){
    stream.put(file.buffer)
  }
  stream.stop();

  stream
    .pipe(csv())
    .on('data', (data) => {
      db.collection('analytics').save(data, (err, result) => {
        if (err) return console.log(err);

        console.log('saved to database');
  
        res.redirect('/graph');
      });
    });
})


MongoClient.connect('mongodb://localhost/sensors', (err, database) => {
  console.log(err, database);

  if (err) return console.log(err);

  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000');
  })
})
