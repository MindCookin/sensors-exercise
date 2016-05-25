'use strict';

angular.
  module('dashboard').
  component('dashboard', {
    templateUrl: 'dashboard/dashboard.template.html',
    controller: function DashboardController() {
      this.testing = "Dashboard pepito";
    }
  });
