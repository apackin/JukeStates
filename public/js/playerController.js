'use strict';

app.controller('playerCtrl', function($scope, $http, $rootScope) {
	var audio = document.createElement('audio');

	$rootScope.$on('selectedSong', function (event, data) {
		audio.src = data.url;
		$scope.currentSong = true;
		audio.play();
	});

	$rootScope.$on('pauseSong', function (event, data) {
		$scope.pauseSong(data);
	});


	$scope.pauseSong = function (data) {
		audio.pause();
		$scope.currentSong = false;
		if(!data) $rootScope.$broadcast('pauseSongfromPlayer', true);
	};

	$scope.nextSong = function() {
		$rootScope.$broadcast('nextSong');
	};

	$scope.previousSong = function() {
		$rootScope.$broadcast('previousSong');
	};

  	audio.addEventListener('timeupdate', function(){
		$scope.progress = 100 * audio.currentTime / audio.duration;
		$scope.$digest();
	});

	audio.addEventListener('ended', function(){
		$scope.nextSong();
	});

	$scope.scrubaDubDub = function(e){
		audio.currentTime = e.offsetX/e.srcElement.parentNode.offsetWidth * audio.duration;
	};
	

});