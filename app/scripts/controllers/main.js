'use strict';

/**
 * @ngdoc function
 * @name rssfeederApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rssfeederApp
 */
angular.module('rssfeederApp')
  .controller('MainCtrl', function ($scope) {
    //which feed is active now
    $scope.activeFeed = 0;

    $scope.feeds = [];


    $scope.loadfeed = function(index){
      var googlefeed = new google.feeds.Feed($scope.feeds[index]);
      console.log($scope.feeds[index]);
      $scope.activeFeed = index;
      googlefeed.load(function(result) {
        if (!result.error) {
          var container = document.getElementById("right");
          container.innerHTML = "";
          for (var i = 0; i < result.feed.entries.length; i++) {
            var entry = result.feed.entries[i];
            var div = document.createElement("div");
            div.className = 'rssfeed';
            div.innerHTML = entry.content;
            container.appendChild(div);
          }
        }
      });
    };


    $scope.search = function(){
      var input = this.input;
      $scope.feeds.unshift(input);
      $scope.loadfeed(0);
      var stringify = JSON.stringify(this.feeds);
      localStorage.setItem("feedArray", stringify);

    };

    $scope.checkActive = function(index){
      return $scope.activeFeed==index ? 'myactive' : '';
    };

    $scope.init = function () {
      var getData = localStorage.getItem("feedArray");
      var jsonResponse = JSON.parse(getData);
      $scope.feeds = jsonResponse == null ? [] : jsonResponse;
      $scope.loadfeed(0);
    }();

  });
