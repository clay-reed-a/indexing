'use strict';

/**
 * @ngdoc function
 * @name indexingApp.controller:WebctrlCtrl
 * @description
 * # WebctrlCtrl
 * Controller of the indexingApp
 */
angular.module('indexingApp')
  .controller('WebCtrl', function ($scope) {
    $scope.pages = [
      'a cat sat on the mat',
      'a dog stood on the mat',
      'the cat stood while the dog sat'
    ];


    $scope.authorWebPage = function(newPage) {
      $scope.pages.push(newPage);
    };

    $scope.$watchCollection('pages', function(newVal, oldVal) {
      console.log(newVal);
      console.log(oldVal);
      if (newVal !== oldVal) {
        $scope.$broadcast('pages-added');
      }
    });
  });
