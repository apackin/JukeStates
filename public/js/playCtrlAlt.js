'use strict';

var app = angular.module('juke', []);

app.controller('playerCtrl', function($scope, $http, $rootScope) {
	
	$scope.audio = document.createElement('audio');

	$scope.pauseButtonPressed = function () {
		$rootScope.$broadcast('pausePlayer');
	}

	$scope.playSong = function (songUrl) {
		$scope.nowPlaying = true;
		$scope.audio.src = songUrl;
		$scope.audio.play();
	}

	$scope.pauseSong = function () {
		$scope.nowPlaying = false;
		$scope.audio.pause();
	}

	$scope.nextSong = function () {
		$rootScope.$broadcast('nextSong');
	}

	$scope.previousSong = function () {
		$rootScope.$broadcast('previousSong');
	}

	$rootScope.$on('songPlaying', function (event, data) {
		$scope.playSong(data.url)
	});

	$rootScope.$on('songPaused', function() {
		$scope.pauseSong();
	});

	$scope.audio.addEventListener('timeupdate', function(){
		$scope.progress = 100 * $scope.audio.currentTime / $scope.audio.duration;
		$scope.$digest();
	});

	$scope.audio.addEventListener('ended', function(){
		$scope.nextSong();
	});

})