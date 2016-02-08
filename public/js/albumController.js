
app.controller('albumCtrl', function($scope, $http, $rootScope) {
	
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
		$scope.currentSong = null;
		if(!data) $rootScope.$broadcast('pauseSong', true);
	}



	$rootScope.$on('previousSong', $scope.previousSong = function() {
			var songs = $scope.album.songs,
					currentIndex = songs.indexOf($scope.currentSong),
					previousSong;

			previousSong = currentIndex===0 ? songs[songs.length-1] : songs[currentIndex-1];

			$scope.playSong(previousSong);
			$rootScope.$broadcast('play', previousSong);
			
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