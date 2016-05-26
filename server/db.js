"use strict";

const Q = require('q');
const MongoClient = require('mongodb').MongoClient;

var db;

module.exports = {
  connect: () => {

    let deffered = Q.defer();
    MongoClient.connect("mongodb://localhost/sensors", (err, database) => {
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
  insert: (query) => {

    let deffered = Q.defer();
    //TODO: Don't forget "update"
    db.collection('analytics').insert(query, (err, results) => {
      if (err) deffered.reject(err);

      console.log('saved to database');
      deffered.resolve(results);
    });

    return deffered.promise;
  }
};
