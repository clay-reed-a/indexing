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
      {text: 'a cat sat on the mat', relevance: 1},
      {text: 'a dog stood on the mat', relevance: 1},
      {text: 'the cat stood while the dog sat', relevance: 1}
    ];


    $scope.authorWebPage = function(pageText) {
      pageText = pageText.toLowerCase();
      var newPage = {
        text: pageText, 
        relevance: 1
      };

      $scope.pages.push(newPage);
      $scope.pageText = '';
    };



    $scope.$watchCollection('pages', function(newVal, oldVal) {
      if (newVal !== oldVal) {
        $scope.$broadcast('pages-added');
        console.log("pages added");
      }
    });
  });
