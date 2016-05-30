'use strict';

angular.
  module('dashboard').
  factory('DashboardService', ['$http',
    function($http) {
      return {
        getData: function(query) {
          return $http({
              method  : 'GET',
              url     : '/dashboard/' + query.name + '/' + query.from + '/' + query.to,
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function (response) {
              return response.data;
            });
        },
        getNames: function(query) {
          return $http({
              method  : 'GET',
              url     : '/dashboard/names',
              headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function (response) {
              return response.data;
            });
        }
      };
    }
  ]);
