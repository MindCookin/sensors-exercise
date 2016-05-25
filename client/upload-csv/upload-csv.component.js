'use strict';

angular.
  module('uploadCsv').
  component('uploadCsv', {
    templateUrl: 'upload-csv/upload-csv.template.html',
    controller: ['Upload', '$timeout', function UploadCsvController(Upload, $timeout) {
      var self = this;

      self.uploadFiles = function uploadFiles(files, errFiles) {
        self.files = files;
        self.errFiles = errFiles;

        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: '/files',
                data: {myfile: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    self.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });
        });

      }
    }]
  });
