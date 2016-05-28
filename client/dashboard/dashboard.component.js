'use strict';

angular.
  module('dashboard').
  component('dashboard', {
    templateUrl: 'dashboard/dashboard.template.html',
    controller: ['DashboardService', function DashboardController(DashboardService) {

      var self = this;

      self.query = {
        range: 0
      };
      self.ranges['Day', 'Week', 'Month'];

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

            // data.name
            // data.acquireDate
            // data.humidity
            // data.precipitation
            // data.pressure
            // data.date

            self.labels = _.map(data, function (item) {
              return new Date(item.date).toDateString();
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

            console.log(self.data);
          })
      };
    }]
  });
