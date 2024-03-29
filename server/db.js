"use strict";

const _ = require('lodash');
const Q = require('q');
const MongoClient = require('mongodb').MongoClient;

const URI = 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/sensors';

var db;

function updateOrInsert(queries, index, cb) {

  let query = queries[index];

  db.collection('analytics').update(
    {name: query.name, date: query.date, acquireDate: {$lte: query.acquireDate}},
    {$set: query},
    {upsert: true, multi: true},
    (err, results) => {

      index += 1;

      if (index === queries.length) {
        if (err) {
          cb(err);
        } else {
          cb(null, results);
        }
      } else {
        updateOrInsert(queries, index, cb);
      }
  })
}

module.exports = {
  connect: () => {

    let deffered = Q.defer();
    MongoClient.connect(URI, (err, database) => {
      if (err) deffered.reject(err);
      db = database;
      console.log('connected to database')
      deffered.resolve();
    })

    return deffered.promise;
  },
  get: (query) => {

    let deffered = Q.defer();
    db.collection('analytics')
      .find(query)
      .toArray((err, results) => {
        if (err) deffered.reject(err);

        console.log('fetch from database: ', results);
        deffered.resolve(results);
      });

    return deffered.promise;
  },
  insert: (queries) => {

    let deffered = Q.defer();

    updateOrInsert(queries, 0, function (err, results) {

      if (err) {
        deffered.reject(err);
      } else {
        console.log('updated database');
        deffered.resolve(results);
      }
    })

    return deffered.promise;
  },
  getNames: () => {
    let deffered = Q.defer();

    db.collection('analytics')
      .find({}, {_id:0, acquireDate: 0, date: 0, })
      .toArray((err, results) => {
        if (err) deffered.reject(err);

        var response = _.reduce(results, function(result, value, key){
         if (value.name && result.names.indexOf(value.name) < 0) {
           result.names.push(value.name)
         }

         _.forEach(_.keys(value), function (k) {
           if (k !== 'name' && result.metrics.indexOf(k) < 0) {
             result.metrics.push(k);
           }
         });

         return result;
       }, {names: [], metrics: []})

        console.log('got names from database');
      deffered.resolve(response);
    });

    return deffered.promise;
  }
};
