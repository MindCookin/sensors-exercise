"use strict";

const os = require('os');
const _ = require('lodash');
const config = require('./config');

function DataParser() {

  function acquisitionDateStringToDateString(ad) {
    var day = parseInt(ad.substring(0,2));
    var month = parseInt(ad.substring(2,4)) - 1;
    var year = parseInt(ad.substring(4));

    return new Date(year, month, day).toDateString();
  }

  return {
    mergeMetrics: function (toBeMerged) {

      var actions = config['METRICS_ACTIONS'], f;

      return toBeMerged.map(function (item) {

        for (var key in actions) {
          f = actions[key];

          if (item[key]) {
            item[key] = f(item[key]);
          }
        }

        return item;
      })
    },

    transform: function (files) {

      let transformed = [];

      for (let file of files){

        let name = file.originalname.split('-')[0];
        let acquireDate = file.originalname.split('-')[1].replace('.csv', '');
        acquireDate = acquisitionDateStringToDateString(acquireDate);

        file.buffer.toString()
          .split(os.EOL)
          .forEach((line, index) => {
            let duplicate = null, duplicateIndex = -1;
            line = line.split(',');

            if (index > 0 && line[0]) {

              var signal = _.trim(line[0]);
              var value = parseInt(line[2]);
              var timestamp = parseInt(line[1]);
              var target = {
                name: name,
                acquireDate: acquireDate,
                date: new Date(timestamp).toDateString()
              }

              target[signal] = value;

              duplicateIndex = _.findIndex(transformed, {'name': target.name, 'date': target.date});

              duplicate = duplicateIndex >= 0 ? transformed[duplicateIndex] : null;

              if (duplicate) {

                if (duplicate.timestamps.indexOf(timestamp) >= 0) {

                  if (duplicate.acquireDate < acquireDate) {
                    // Sustituimos
                    transformed[duplicateIndex] = target;

                  } else if (duplicate.acquireDate === acquireDate) {
                    // Actualizamos
                    duplicate[signal] = duplicate[signal] || [];
                    duplicate[signal].push(value);
                    duplicate.timestamps.push(timestamp)
                  } else {
                    // Descartamos
                  }
                } else {
                  // Actualizamos
                  duplicate[signal] = duplicate[signal] || [];
                  duplicate[signal].push(value);
                  duplicate.timestamps.push(timestamp)
                }
              } else {
                // Añadimos
                target[signal] = [value];
                target.timestamps = [timestamp];
                transformed.push(target)
              }
            }
          });
      };

      transformed = this.mergeMetrics(transformed);

      return transformed.map((item) => {
        delete item.timestamps;
        return item;
      });
    }
  }
}

module.exports = DataParser;
