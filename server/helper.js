"use strict";

const config = require('./config');

const os = require('os');

module.exports = {
  fetchQuery: (body) => {

    let query = {
      name: body.name,
      timestamp: {
        $gt: body.from && new Date(body.from).getTime() || 0,
        $lt: body.to && new Date(body.to).getTime() || Number.MAX_SAFE_INTEGER,
      }
    };

    if (body.signal) {
      query.signal = {'$in': (typeof body.signal !== 'string' ) ? body.signal : [body.signal]};
    }

    console.log("HELPER: fetch query");

    return query;
  },
  insertQuery: (files) => {

      let data, values, query = [];
      let signal, timestamp, value;

      // TODO: this should be done asynchronously with streams
      for (let file of files){

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

      console.log("HELPER: insert query");

      return query;
  }
}
