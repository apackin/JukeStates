'use strict';

var app = angular.module('juke', []);

var fakeAlbum = {
    name: 'Abbey Road',
    imageUrl: 'http://fillmurray.com/300/300',
    songs: [{
        name: 'Romeo & Juliette',
        artists: [{name: 'Bill'}],
        genres: ['Smooth', 'Funk'],
        audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2013.mp3'
    }, {
        name: 'White Rabbit',
        artists: [{name: 'Bill'}, {name: 'Bob'}],
        genres: ['Fantasy', 'Sci-fi'],
        audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2008.mp3'
    }, {
        name: 'Lucy in the Sky with Diamonds',
        artists: [{name: 'Bob'}],
        genres: ['Space'],
        audioUrl: 'http://www.stephaniequinn.com/Music/Commercial%20DEMO%20-%2001.mp3'
    }]
};

app.controller('mainCtrl', function($scope, $http) {
	var audio = document.createElement('audio');

	$scope.pauseSong = function () {
		audio.pause();
		$scope.currentSong = null;
	}

	$scope.playSong = function (song) {
		if( $scope.currentSong === song ) {
			$scope.pauseSong();
		} else {
			$scope.currentSong = song;

			audio.src = 'api/songs/'+song._id+'.audio';
			audio.play();
		}
	};

	$scope.nextSong = function() {
		var songs = $scope.album.songs,
				currentIndex = songs.indexOf($scope.currentSong),
				nextSong;

		nextSong = currentIndex===songs.length-1 ? songs[0] : songs[currentIndex+1];
		$scope.playSong(nextSong);
	}

	$scope.previousSong = function() {
		var songs = $scope.album.songs,
				currentIndex = songs.indexOf($scope.currentSong),
				previousSong;

		previousSong = currentIndex===0 ? songs[songs.length-1] : songs[currentIndex-1];
		$scope.playSong(previousSong);
	}

	audio.addEventListener('ended', function(){
		$scope.nextSong();
	});

	audio.addEventListener('timeupdate', function(){
		$scope.progress = 100 * audio.currentTime / audio.duration;
		$scope.$digest();
	});


	$http.get('api/albums/')
    .then(function (albums) {
      return albums.data[4]
    })
    .then(function (album) {
    	return $http.get('/api/albums/'+album._id)
    })
    .then(function (album) {
			$scope.album = album.data;
			$scope.album.imageUrl = '/api/albums/'+$scope.album._id+'.image';

      console.log('the server responded with', album);
    })
    .catch(console.error.bind(console));

});
