'use strict';

/**
 * @ngdoc function
 * @name indexingApp.controller:SearchengineCtrl
 * @description
 * # SearchengineCtrl
 * Controller of the indexingApp
 */
angular.module('indexingApp')
  .controller('SearchengineCtrl', function ($scope) {
 

    var indexWebPages = function(theWeb) {
      var db = {}; 
      for (var n = 0; n < theWeb.length; n++) {
        var page = theWeb[n];
        var words = page.split(' '); 
        for (var pos = 0; pos < words.length; pos++) {
          var word = words[pos];
          var data = {
            on: n+1,
            at: pos+1 
          }; 
          if (db[word]) {
            db[word].push(data);
          } else {
            var dbEntry = [];
            dbEntry.push(data);
            db[word] = dbEntry;  
          }
        }
      }
      console.log(db);
      return db; 
    };

    $scope.database = indexWebPages($scope.$parent.pages);

    $scope.$on('pages-added', function() {
      $scope.database = indexWebPages($scope.$parent.pages);
    });
  });
