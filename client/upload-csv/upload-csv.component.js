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

        // self.files = files;
        //
        // if (files && files.length) {
        //     Upload.upload({
        //         url: '/files',
        //         data: {
        //             files: files
        //         }
        //     }).then(function (response) {
        //         $timeout(function () {
        //             file.result = response.data;
        //         });
        //     }, function (response) {
        //         if (response.status > 0) {
        //             self.errorMsg = response.status + ': ' + response.data;
        //         }
        //     }, function (evt) {
        //         self.progress =
        //             Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        //     });
        // }

        self.files = files;
        self.sendFinished = false;

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
                else {
                  self.sendFinished = true;
                }
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });
        });

      }
    }]
  });
