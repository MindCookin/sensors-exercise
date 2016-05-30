"use strict";

const DB = require('./db');
const api_helper = require('./helper');

const path = require('path');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const storage = multer.memoryStorage();
const upload = multer({storage});
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

app.get('/dashboard/:name/:from/:to', (req, res) => {

  DB.get( api_helper.fetchQuery({
    name: req.params.name,
    from: req.params.from,
    to:   req.params.to
  }) )
    .then((results) => {
      console.log('received metrics: ', results);
      res.send(results);
    }, console.error);
})

app.post('/upload/files', upload.array('myfile'), (req, res) => {

  DB.insert(api_helper.insertQuery(req.files))
    .then((results) => {
      console.log('saved to database');
      res.send(results);
    }, console.error);
})

app.get('/dashboard/names', (req, res) => {

    DB.getNames()
      .then((results) => {
        console.log('received names: ', results);
        res.send(results);
      }, console.error);
})

DB.connect()
  .then(() => {
    app.listen(3000, () => {
      console.log('listening on 3000');
    })
  }, console.error);
