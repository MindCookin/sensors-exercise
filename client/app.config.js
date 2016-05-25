'use strict';

angular.
  module('sensorsApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/dashboard', {
          template: '<dashboard></dashboard>'
        }).
        when('/upload', {
          template: '<upload-csv></upload-csv>'
        }).
        otherwise('/upload');
    }
  ]);
