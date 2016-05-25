'use strict';

angular.
  module('uploadCsv').
  component('uploadCsv', {
    templateUrl: 'upload-csv/upload-csv.template.html',
    controller: function UploadCsvController() {
      var self = this;

      self.onSubmit = function (ev) {
        //action="/files" method="POST" enctype="multipart/form-data"
        debugger;
      }
    }
  });
