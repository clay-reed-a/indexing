'use strict';

/* Main Module */

angular
  .module('indexingApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/web.html',
        controller: 'WebCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
