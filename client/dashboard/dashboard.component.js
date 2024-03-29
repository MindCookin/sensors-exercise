'use strict';

angular.
  module('dashboard').
  component('dashboard', {
    templateUrl: 'dashboard/dashboard.template.html',
    controller: ['DashboardService', function DashboardController(DashboardService) {

      DashboardService.getNames()
        .then(function (data) {
          self.sensors = data.names.sort();
          self.signals = data.metrics.sort();
        })

      var self = this;
      var lastQueryData, filteredData;
      var rangeActions = [toDaily, toWeekly, toMonthly];
      self.typeHorizontal = 'Line';

      self.checkModel = {
        left: false,
        middle: true,
        right: false
      };

      self.query = {};
      self.filters = {
        range: 0,
        signal : self.signals
      };
      self.ranges = ['Daily', 'Weekly', 'Monthly'];

      self.selectSensor = function (ev, sensor) {
        ev.preventDefault();
        ev.stopPropagation();
        self.displayDropdown = !self.displayDropdown;
        self.query.name = sensor;
      };

      self.updateSignal = function (signal) {

        var signalIndex = self.filters.signal.indexOf(signal);
        if (signalIndex < 0) {
          self.filters.signal.push(signal)
        } else {
          if (self.filters.signal.length === 1) {
            return;
          }

          self.filters.signal.splice(signalIndex, 1);
        }

        rangeActions[self.filters.range]();
      };

      self.onSubmit = function() {

        DashboardService.getData(self.query)
          .then(function (data) {

            if (!data || data.length === 0) {
              alert('No data found for this search. Please try again.')
              return;
            }

            var union = [];

            lastQueryData = data;

            _.forEach(lastQueryData, function (v) {
              union = _.union(union, _.keys(v));
            })

            self.filters.signal = _.intersection(self.signals, union);
            self.providedSignals = _.intersection(self.signals, union);

            self.onChangeRange();
          })
      };

      self.onChangeRange = function (index) {

        if (index >= 0) {
          self.filters.range = index;
        }

        rangeActions[self.filters.range]();
      }

      function toDaily() {

        filteredData = lastQueryData;

        update();
      }

      function toWeekly() {
        var weeks = [];

        _.forEach(lastQueryData, function (item) {
          weeks[getWeekNumber(item.date)] = weeks[getWeekNumber(item.date)] || [];
          weeks[getWeekNumber(item.date)].push(item);
        })

        weeks = _.compact(weeks);

        weeks = _.map(weeks, function (arr) {
          var response = {};
          _.forEach(arr, function (item) {

            var date = new Date(item.date);
            var currentDate = date.getDay();
            var distance = 0 - currentDate;
            date.setDate(date.getDate() + distance)

            response.name = item.name;
            response.date = date;

            _.forEach(self.signals, function(k) {
              response[k] = response[k] || [];
              response[k].push(item[k]);
            })
          })

          return response;
        })

        filteredData = _.map(weeks, mergeMetrics);

        update();
      }

      function toMonthly() {
        var months = [];

        _.forEach(lastQueryData, function (item) {
          months[getMonthNumber(item.date)] = months[getMonthNumber(item.date)] || [];
          months[getMonthNumber(item.date)].push(item);
        })

        months = _.compact(months);

        months = _.map(months, function (arr) {
          var response = {};
          _.forEach(arr, function (item) {

            response.name = item.name;
            response.date = new Date(item.date).setDate(1);

            _.forEach(self.signals, function(k) {
              response[k] = response[k] || [];
              response[k].push(item[k]);
            })
          })

          return response;
        })

        filteredData = _.map(months, mergeMetrics);

        update();
      }

      function update() {

        var data = filteredData;

        self.labels = _.map(data, function (item) {
          var dateString = new Date(item.date).toDateString();

          if (self.filters.range === 1) { // weekly
            var next = new Date(item.date);
            dateString = new Date(item.date).toLocaleString();
            next.setDate(item.date.getDate() + 6);
            dateString = dateString.split(' ')[0] + ' to ' + next.toLocaleString().split(' ')[0];
          } else if (self.filters.range === 2) { // monthly
            dateString = dateString.split(' ')[1] + ' ' + dateString.split(' ')[3]
          } else {
            dateString = new Date(item.date).toLocaleString();
            dateString = dateString.split(' ')[0]
          }

          return dateString;
        });

        self.series = self.filters.signal;
        self.data = [];

        for (var i = 0, x = self.series.length; i < x; i++) {

          var serie = [];
          var serieName = self.series[i];

          for (var j = 0, y = data.length; j < y; j++) {
            var result = parseInt(data[j][serieName], 10) || 0;
            serie.push(result);
          }

          self.data.push(serie);
        }
      }

      function getWeekNumber(d) {
          d = new Date(+d);
          d.setHours(0,0,0);
          d.setDate(d.getDate() + 4 - (d.getDay()||7));
          var yearStart = new Date(d.getFullYear(),0,1);
          var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
          return d.getFullYear() * weekNo;
      }

      function getMonthNumber(d) {
        d = new Date(d);
        return d.getFullYear() * d.getMonth();
      }

      function mergeMetrics(item) {
        _.forEach(self.signals, function(k) {
          item[k] = _.mean(item[k]);
        })
        return item;
      }
    }]
  });
