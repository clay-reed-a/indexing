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
            page: n+1,
            position: pos+1 
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
      return db; 
    };

    $scope.searchWeb = function(query) {
      var words = query.split(' ');
      var db = $scope.database; 
      for (var w = 0; w < words.length; w++) {
        var word = words[w];
        if (db[word]) {
          // what to do? 
          console.log(db[word]);
        }
      }
    };

    $scope.database = indexWebPages($scope.$parent.pages);

    $scope.$on('pages-added', function() {
      $scope.database = indexWebPages($scope.$parent.pages);
    });
  });
