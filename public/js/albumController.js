'use strict';

app.controller('albumCtrl', function($scope, $http, $rootScope) {
	
 //    $scope.keyPress = function (e){
	// 	switch (e) {
	// 		// case 32: $scope.playSong(); break; // this will have to shuffle on play
	// 		case 37: $scope.previousSong(); break;
	// 		case 39: $scope.nextSong(); break;
	// 	}
	// };

	$scope.playSong = function (song) {
		if( $scope.currentSong === song ) {
			$scope.pauseSong();
		} else {
			$scope.currentSong = song;
			$rootScope.$broadcast('selectedSong', {url: 'api/songs/'+song._id+'.audio'});
		}
	};


	$rootScope.$on('pauseSongfromPlayer', function (event, data) {
				$scope.pauseSong(data);
	});

	
	$scope.pauseSong = function (data) {
		// $scope.currentSong = null;
		if(!data) $rootScope.$broadcast('pauseSong', true);
	};


	$rootScope.$on('previousSong', function(){
		$scope.previousSong();
	});

	$scope.previousSong = function() {
			var songs = $scope.album.songs,
					currentIndex = songs.indexOf($scope.currentSong),
					previousSong;

			previousSong = currentIndex===0 ? songs[songs.length-1] : songs[currentIndex-1];

			$scope.playSong(previousSong);
			$scope.$digest();
			
	};

	$rootScope.$on('nextSong', function(){
		$scope.nextSong();
	});

	$scope.nextSong = function() {
		var songs = $scope.album.songs,
				currentIndex = songs.indexOf($scope.currentSong),
				nextSong;

		nextSong = currentIndex===songs.length-1 ? songs[0] : songs[currentIndex+1];

			$scope.playSong(nextSong);
			$scope.$digest();
	};

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