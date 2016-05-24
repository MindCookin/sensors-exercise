"use strict";

const os = require('os');
const path = require('path');
const express = require('express');
const multer = require('multer');
const streamBuffers = require('stream-buffers');
const csv = require('csv-parser');
const split = require('split');
const MongoClient = require('mongodb').MongoClient;

const storage = multer.memoryStorage();
const upload = multer({storage});
const app = express();

var db;

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client/dist', 'index.html'))
})

app.post('/graph', (req, res) => {

  db.collection('analytics')
    .find()
    .toArray((err, results) => {

      if (err) console.log(err);

      console.log(results);
      res.send(results);
    });
})

app.post('/files', upload.array('myfile'), (req, res) => {

  var data;
  var signal, timestamp, value;

  // TODO: this should be done asynchronously with streams
  for (var file of req.files){
    data = data || {};
    var sensorName = file.originalname.split('-')[0];
    var acquisitionTime = file.originalname.split('-')[1]; // not in use

    data[sensorName] = {};

    file.buffer.toString()
      .split(os.EOL)
      .forEach((line, index) => {
        if (index > 0) {
          var values = line.split(',');
          signal = values[0];
          timestamp = values[1];
          value = values[2];

          if (signal && timestamp && value) {
            data[sensorName][signal] = data[sensorName][signal] || [];
            data[sensorName][signal].push({timestamp, value});
          }
        }
      });
  }

  db.collection('analytics').save(data, (err, results) => {

    if (err) return console.log(err);

    console.log('saved to database');
    res.send(results);
  });
})


MongoClient.connect('mongodb://localhost/sensors', (err, database) => {
  if (err) return console.log(err);

  db = database;
  app.listen(3000, () => {
    console.log('listening on 3000');
  })
})
