'use strict';

angular.
  module('dashboard').
  component('dashboard', {
    templateUrl: 'dashboard/dashboard.template.html',
    controller: ['DashboardService', function DashboardController(DashboardService) {

      var self = this;
      var lastQueryData;
      var rangeActions = [toDaily, toWeekly, toMonthly];

      self.query = {
        range: 0
      };
      self.ranges = ['Daily', 'Weekly', 'Monthly'];

      self.onClick = function(points, evt) {
        console.log(points, evt);
      };

      self.onSubmit = function() {

        if (!self.query.signal) {
          alert('Please specify at least one signal');
          return;
        }

        DashboardService.getData(self.query)
          .then(function (data) {
            lastQueryData = data;
            update(data);
          })
      };

      self.onChangeRange = function () {
        rangeActions[self.query.range]();
      }

      function toDaily() {
        update(lastQueryData);
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

            response.precipitation = response.precipitation || [];
            response.precipitation.push(item.precipitation);

            response.temperature = response.temperature || [];
            response.temperature.push(item.temperature);

            response.pressure = response.pressure || [];
            response.pressure.push(item.pressure);

            response.humidity = response.humidity || [];
            response.humidity.push(item.humidity);
          })

          return response;
        })

        weeks = _.map(weeks, mergeMetrics);

        update(weeks, 'week');
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

            response.precipitation = response.precipitation || [];
            response.precipitation.push(item.precipitation);

            response.temperature = response.temperature || [];
            response.temperature.push(item.temperature);

            response.pressure = response.pressure || [];
            response.pressure.push(item.pressure);

            response.humidity = response.humidity || [];
            response.humidity.push(item.humidity);
          })

          return response;
        })

        months = _.map(months, mergeMetrics)

        update(months, 'month');
      }

      function update(data, type) {
        self.labels = _.map(data, function (item) {
          var dateString = new Date(item.date).toDateString();

          if (type === 'week') {
            var next = new Date(item.date);
            next.setDate(item.date.getDate() + 6);
            dateString = 'Week from ' + dateString + ' to ' + next.toDateString();
          } else if (type === 'month') {
            dateString = dateString.split(' ')[1] + ' ' + dateString.split(' ')[3]
          }

          return dateString;
        });

        self.series = self.query.signal;
        self.data = [];

        for (var i = 0, x = self.series.length; i < x; i++) {

          var serie = [];
          var serieName = self.series[i];

          for (var j = 0, y = data.length; j < y; j++) {
            serie.push(data[j][serieName])
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
        item.precipitation = _.sum(item.precipitation);
        item.temperature = _.mean(item.temperature);
        item.pressure = _.mean(item.pressure);
        item.humidity = _.mean(item.humidity);
        return item;
      }
    }]
  });
