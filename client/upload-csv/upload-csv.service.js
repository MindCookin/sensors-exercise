'use strict';

angular.
  module('uploadCsv').
  factory('upload', ['$resource, $http',
    function($resource, $http) {
      // return $resource('/files', {}, {
      //   query: {
      //     method: 'POST'
      //   }
      // });

      var formData = new FormData();
      formData.append("file", $scope.file);

      return $http({
            method: 'POST',
            url: '/files',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData,
            transformRequest: formDataObject
        }).
        then(function(result) {
            console.log(result);
            return result.data;
        });
    }
  ]);
