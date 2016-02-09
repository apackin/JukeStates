'use strict';

var app = angular.module('juke', []);

app.controller('playerCtrl', function($scope, $http, $rootScope) {
	var audio = document.createElement('audio');

	$rootScope.$on('selectedSong', function (event, data) {
				audio.src = data.url;
				audio.play();
	});


	$rootScope.$on('pauseSong', function (event, data) {
				$scope.pauseSong(data);
	});


	$scope.pauseSong = function (data) {
		audio.pause();
		if(!data) $rootScope.$broadcast('pauseSongfromPlayer', true);
	};

	$scope.nextSong = function() {
		var songs = $rootScope.album.songs,
				currentIndex = songs.indexOf($rootScope.currentSong),
				nextSong;

		nextSong = currentIndex===songs.length-1 ? songs[0] : songs[currentIndex+1];


		$rootScope.$broadcast('play', nextSong);
		// $scope.playSong(nextSong);
	}

	$scope.previousSong = function() {
		// var songs = $rootScope.album.songs,
		// 		currentIndex = songs.indexOf($rootScope.currentSong),
		// 		previousSong;

		// previousSong = currentIndex===0 ? songs[songs.length-1] : songs[currentIndex-1];
		// // $scope.playSong(previousSong);
		$rootScope.$broadcast('previousSong');
	}

  audio.addEventListener('timeupdate', function(){
		$scope.progress = 100 * audio.currentTime / audio.duration;
		$scope.$digest();
	});

	audio.addEventListener('ended', function(){
		$scope.nextSong();
	});
	

});