"use strict";

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({storage});
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client/dist', 'index.html'))
})

app.post('/files', upload.single('myfile'), (req, res) => {
    console.log('buffer:', req.file.buffer.toString());
})

app.listen(3000, () => {
  console.log('listening on 3000');
})
