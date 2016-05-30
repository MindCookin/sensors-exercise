'use strict';

var fs = require('fs');

var SIGNALS = ['precipitation','humidity','pressure','temperature'];
var MAX_RANGE = 100;
var NAMES = ['sensor1','sensor2','sensor3','sensor4','sensor5','sensor6'];
var MIN_ACQUIRE_DATE = 1433106602676;
var ENTRIES = [10, 40];
var ROWS = [20, 80];

var EOL = require('os').EOL;

var aMillisecondsDay = 1000 * 60 * 60 * 24;
var fileName, rowsString;

function generateFileName (name, acquireDate) {
  var auxDate = new Date(acquireDate);
  //auxDate = sensor1-23052016
  var rowsString = 'id-senial,timestamp-lectura,valor-lectura';

  return  name + '-' +
          (auxDate.getDate() < 10 ? '0' + auxDate.getDate() : auxDate.getDate()) +
          (auxDate.getMonth() < 10 ? '0' + auxDate.getMonth() : auxDate.getMonth()) +
          auxDate.getFullYear();
}

for (var i = 0, max = 365; i < max; i++) {
  var acquireDate = MIN_ACQUIRE_DATE + (i * aMillisecondsDay);

  for (var j = 0, jmax = NAMES.length; j < jmax; j++) {
    fileName = generateFileName(NAMES[parseInt(Math.random() * NAMES.length, 10)], acquireDate);
  }

  for (var k = 0, kmax = (parseInt(Math.random() * ROWS[1], 10) - ROWS[0]); k < kmax; k++) {
    rowsString += EOL +
      SIGNALS[parseInt(Math.random() * SIGNALS.length, 10)] + ',' +
      acquireDate + parseInt(Math.random() * aMillisecondsDay, 10) + ',' +
      parseInt(MAX_RANGE * Math.random(), 10);

    fs.writeFile('csv/' + fileName, rowsString, function(err) {
      if (err) return console.log(err);
      console.log(fileName + 'was saved!');
    });
  }


}
