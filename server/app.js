"use strict";

const DB = require('./db');

const os = require('os');
const path = require('path');
const express = require('express');
const multer = require('multer');
const streamBuffers = require('stream-buffers');
const bodyParser = require('body-parser');
const csv = require('csv-parser');
const split = require('split');

const storage = multer.memoryStorage();
const upload = multer({storage});
const app = express();


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

app.post('/graph', bodyParser.urlencoded(), (req, res) => {

  console.log("request: ", req.body);
  let query = {
    name: req.body.name,
    timestamp: {
      $gt: req.body.from && new Date(req.body.from).getTime() || 0,
      $lt: req.body.to && new Date(req.body.to).getTime() || Number.MAX_SAFE_INTEGER,
    }
  };

  if (req.body.signal) {
    query.signal = {'$in': (typeof req.body.signal !== 'string' ) ? req.body.signal : [req.body.signal]};
  }

  console.log(query)

  DB.get(query)
    .then((results) => {
      console.log('received metrics: ', results);
      res.send(results);
    }, console.error);
})

app.post('/files', upload.array('myfile'), (req, res) => {

  let data, values, query = [];
  let signal, timestamp, value;

  // TODO: this should be done asynchronously with streams
  for (let file of req.files){

    let name = file.originalname.split('-')[0];
    let acquisitionTime = file.originalname.split('-')[1].replace('.csv', '');

    file.buffer.toString()
      .split(os.EOL)
      .forEach((line, index) => {
        if (index > 0) {
          values = line.split(',');
          signal = values[0];
          timestamp = parseInt(values[1]);
          value = parseInt(values[2]);

          if (signal && timestamp && value) {
            query.push({name, signal, timestamp, value})
          }
        }
      });
  }

  console.log(query);

  DB.insert(query)
    .then((results) => {
      console.log('saved to database');
      res.send(results);
    }, console.error);
})

DB.connect()
  .then(() => {
    app.listen(3000, () => {
      console.log('listening on 3000');
    })
  }, console.error);
