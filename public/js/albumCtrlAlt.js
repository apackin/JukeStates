'use strict';

app.controller('albumCtrl', function($scope, $http, $rootScope) {

	$scope.playOrPauseSong = function (song) {
		if( $scope.currentSong===song ) {
			$scope.pauseSong()
		} else {
			$scope.setCurrentSong(song);
			$scope.playSong();
		}
	}
	
	$scope.setCurrentSong = function (song) {
		$scope.currentSong = song;
	}

	$scope.playSong = function() {
		$rootScope.$broadcast('songPlaying', { url: 'api/songs/'+ $scope.currentSong._id + '.audio' });
	}

	$scope.pauseSong = function() {
		$scope.currentSong = null;
		$rootScope.$broadcast('songPaused');
	}

	$rootScope.$on('pausePlayer', function() {
		$scope.pauseSong();
	})

	$rootScope.$on('nextSong', function() {
		var songs = $scope.album.songs,
				currentIndex = songs.indexOf($scope.currentSong),
				nextSong;

		nextSong = (currentIndex===songs.length-1) ? songs[0] : songs[currentIndex+1];

		$scope.setCurrentSong(nextSong);
		$scope.$digest();
		$scope.playSong();
	})

	$rootScope.$on('previousSong', function () {
		var songs = $scope.album.songs,
				currentIndex = songs.indexOf($scope.currentSong),
				previousSong;

		previousSong = currentIndex===0 ? songs[songs.length-1] : songs[currentIndex-1];

		$scope.setCurrentSong(previousSong);
		$scope.playSong();
	})

	$http.get('api/albums/')
    .then(function (albums) {
      return albums.data[3]
    })
    .then(function (album) {
    	return $http.get('/api/albums/'+album._id)
    })
    .then(function (album) {
			$scope.album = album.data;
			$scope.album.imageUrl = '/api/albums/'+$scope.album._id+'.image';
    })
    .catch(console.error.bind(console));
})