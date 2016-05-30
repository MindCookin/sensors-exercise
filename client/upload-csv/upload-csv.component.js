'use strict';

angular.
  module('uploadCsv').
  component('uploadCsv', {
    templateUrl: 'upload-csv/upload-csv.template.html',
    controller: ['Upload', '$timeout', function UploadCsvController(Upload, $timeout) {
      var self = this;


      angular.element(window).bind('dragover', function (e) {
        e.preventDefault();
      });
      angular.element(window).bind('drop', function (e) {
        e.preventDefault();
      });

      self.dragoverObj = {
        accept:'dragover',
        reject:'dragover-err',
        pattern:'text/*'
      };

      self.uploadFiles = function uploadFiles(files) {

        self.files = files;
        self.response = {updated: 0, inserted: 0};

        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: '/upload/files',
                data: {myfile: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;

                    if (file.result.upserted) {
                      self.response.upserted += 1;
                    } else if (file.result.nModified) {
                      self.response.inserted += 1;
                    }
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
