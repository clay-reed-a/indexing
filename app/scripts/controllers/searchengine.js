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
      // takes a web array & returns a database object  
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

    $scope.database = indexWebPages($scope.$parent.pages);
    $scope.databaseIndex = Object.keys($scope.database);
    $scope.queryWords = Object.keys($scope.database);

    $scope.searchWeb = function(query) {
      if (query) {
        var words = query.split(' ');
        var allRelevantEntries = [];
        for (var w = 0; w < words.length; w++) {
          var word = words[w];
          var wordEntries = getEntriesForWord(word);
          for (var e = 0; e < wordEntries.length; e++) {
            var entry = wordEntries[e];
            allRelevantEntries.push(entry);
          }
          console.log(allRelevantEntries);
          $scope.queryWords = allRelevantEntries;
        }
      } else {
        $scope.queryWords = Object.keys($scope.database);
      }
    };

    var getEntriesForWord = function(word) {
      var entries = [];
      var dbIndex = $scope.databaseIndex;
      for (var i = 0; i < dbIndex.length; i++) {
        var dbEntryName = dbIndex[i]; 
        if (dbEntryName.indexOf(word) == 0) {
          entries.push(dbEntryName);
        }
      }
      return entries; 
    };

    $scope.$on('pages-added', function() {
      $scope.database = indexWebPages($scope.$parent.pages);
    });
  });
