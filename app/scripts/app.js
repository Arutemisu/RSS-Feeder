'use strict';

/**
 * @ngdoc overview
 * @name rssfeederApp
 * @description
 * # rssfeederApp
 *
 * Main module of the application.
 */
angular
  .module('rssfeederApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
