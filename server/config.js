"use strict";

const _ = require('lodash');

exports = {
  METRICS_ACTIONS: {
    temperature: _.mean,
    pressure: _.mean,
    humidity: _.mean,
    precipitation: _.sum
  }
};
