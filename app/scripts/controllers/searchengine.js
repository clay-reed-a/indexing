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
      for (var ip = 0; ip < theWeb.length; ip++) {
        var page = theWeb[ip];
        var words = page.split(' '); 
        for (var pos = 0; pos < words.length; pos++) {
          var word = words[pos];
          var info = {
            ipAddress: ip+1,
            position: pos+1 
          }; 
          if (db[word]) {
            db[word].push(info);
          } else {
            var dbEntry = [];
            dbEntry.push(info);
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
