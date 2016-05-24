'use strict';

/**
 * @ngdoc Controller For Main.js
 * @name rssfeederApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the rssfeederApp
 */
angular.module('rssfeederApp')
  .controller('MainCtrl', function ($scope) {
    //which feed is active now
    $scope.activeFeed = 0;
    //array of RSS feeds URL
    $scope.feeds = [];

    //load feed from selected item to the view window
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
      var contains = $.inArray(input, $scope.feeds);
      //check whether we already have this URL. load the feed of the selected URL but only add new Entries
      if (contains == -1) {
        $scope.feeds.unshift(input);
        $scope.loadfeed(0);
      } else {
        $scope.activeFeed = contains;
        $scope.loadfeed($scope.activeFeed);
      }

      var stringify = JSON.stringify(this.feeds);
      localStorage.setItem("feedArray", stringify);

    };

    //check which item is active in the list
    $scope.checkActive = function(index){
      return $scope.activeFeed==index ? 'myactive' : '';
    };
    //remove item from the list
    $scope.removeItem = function(index) {
      $scope.feeds.splice(index,1);
      var stringify = JSON.stringify(this.feeds);
      localStorage.setItem("feedArray", stringify);
    };

    //init function
    $scope.init = function () {
      var getData = localStorage.getItem("feedArray");
      var jsonResponse = JSON.parse(getData);
      $scope.feeds = jsonResponse == null ? [] : jsonResponse;
      $scope.loadfeed(0);
    }();

  });
