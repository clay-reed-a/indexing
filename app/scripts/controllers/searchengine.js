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
        var page = theWeb[n].text;
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

    var getEntriesForAll = function(words) {
      return words.map(function(word) {
        return $scope.database[word];
      });
    };

    $scope.searchWeb = function(query) {
      if (query) {
        var allRelevantEntries = [];
        var phraseQueries = query.match(/"[\w\s]*"/g);

        if (phraseQueries) {
          for (var p = 0; p < phraseQueries.length; p++) {
            var phraseQuery = phraseQueries[p].replace(/"/g, '');

            query = query.replace(phraseQueries[p], '');
   
            var phraseWords = phraseQuery.split(' ');
 
            var phraseWordsEntries = getEntriesForAll(phraseWords);

            var phraseQueryMatchPages = [];
            for (var m = 0; m < phraseWordsEntries.length; m++) {
              allRelevantEntries.push(phraseWords[m]);
              var phraseWordEntry = phraseWordsEntries[m];
              for (var t = 0; t < phraseWordEntry.length-1; t++) {
                var phraseWordOcc = phraseWordEntry[t]; 
                var page = phraseWordOcc.page;
                var pos = phraseWordOcc.position;
                
                var nextPos = pos+1; 
                
                var pageIsMatch = true; 
                for (var c = m+1; c < phraseWordsEntries.length; c++, nextPos++) {
                  var nextPhraseWordEntry = phraseWordsEntries[c];
  
                  for (var v = 0; v < nextPhraseWordEntry.length; v++) {
                    var nextPhraseWordOcc = nextPhraseWordEntry[v];
                    var currentPage = nextPhraseWordOcc.page; 
                    var currentPos = nextPhraseWordOcc.position;

                    var samePage = page == currentPage;
                    var directlyFollows = (nextPos == currentPos); 

                    
                    if (!(samePage && directlyFollows)) {
                      pageIsMatch = false; 
                    }
                  }  
                }

                if (pageIsMatch) {
                  phraseQueryMatchPages.push(page-1);
                }
              }
            }
          }
        }

        console.log(phraseQueryMatchPages);

        var words = query.split(' ');
        if (words[0] !== '') {
          for (var w = 0; w < words.length; w++) {
            var word = words[w];
            var wordEntries = getEntriesForWord(word);
            for (var e = 0; e < wordEntries.length; e++) {
              var entry = wordEntries[e];
              allRelevantEntries.push(entry);
            }
          }
        }
        
        $scope.queryWords = allRelevantEntries;

        
        if (phraseQueries) {
          var a = getRelevantPages();
          console.log(a);
          var b = phraseQueryMatchPages; 
          console.log(b);
          var r = intersection(a, b);
          console.log(r);
        } else {
          var r = getRelevantPages();
        }
        
        $scope.$parent.relevantPages = r;
        
      } else {
        $scope.queryWords = Object.keys($scope.database);
        $scope.$parent.relevantPages = showAllPages();

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

    var showAllPages = function() {
      var i = -1; 
      return $scope.$parent.pages.map(function(item) {
        i++ 
        return i; 
      }); 
    };

    var getRelevantPages = function() {
      var words = $scope.queryWords;
      var relevantPages = [];
      for (var q = 0; q < words.length; q++) {
        var wordPages = [];
        var word = words[q];
        var entries = $scope.database[word];
        for (var e = 0; e < entries.length; e++) {
          var entry = entries[e]; 
          wordPages.push(entry.page-1);
        }
        relevantPages.push(wordPages);
      }
      console.log(relevantPages);
      var r = indeterminateIntersection(relevantPages);
      console.log(r);
      return r;
    }; 

    var indeterminateIntersection = function(twoArray) {
      if (twoArray.length > 2) {
        var firstArray = twoArray.shift();
        var lastArray = twoArray.pop(); 
        var intersectionThereof = intersection(firstArray, lastArray);
        twoArray.push(intersectionThereof);
        return indeterminateIntersection(twoArray);
      } else if (twoArray.length == 2) {
        return intersection(twoArray.shift(), twoArray.pop()); 
      } else {
        return twoArray[0];
      }
    };

    var intersection = function(a, b) {
      var r = a.filter(function(e) {
        var eInB = false; 
        for (var i = 0; i < b.length; i++) {
          if (e == b[i]) {
            eInB = true; 
          }
        }
        return eInB;
      });

      return r;
    };

    $scope.$parent.relevantPages = showAllPages();


    $scope.$on('pages-added', function() {  
      $scope.database = indexWebPages($scope.$parent.pages);
      $scope.databaseIndex = Object.keys($scope.database);
      if ($scope.query) {
        $scope.searchWeb($scope.query);
      } else {
        $scope.queryWords = $scope.databaseIndex;
      }
      $scope.$parent.relevantPages = getRelevantPages();       
    });
  });
