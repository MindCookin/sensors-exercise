'use strict';

angular.
  module('dashboard').
  component('dashboard', {
    templateUrl: 'dashboard/dashboard.template.html',
    controller: ['DashboardService', function DashboardController(DashboardService) {
      this.query = {};
      this.labels = ["January", "February", "March", "April", "May", "June", "July"];
      this.series = ['Series A', 'Series B'];
      this.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
      ];
      this.onClick = function(points, evt) {
        console.log(points, evt);
      };

      this.onSubmit = function() {
        DashboardService.getData(this.query)
          .then(function (data) {
            console.log("data >>>> ", data);
          })
      };
    }]
  });
