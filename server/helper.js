"use strict";

const config = require('./config');
const DataParser = require('./dataparser');

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

      let parser = new DataParser();
      let query = parser.transform(files);

      console.log("HELPER: insert query");

      return query;
  }
}
