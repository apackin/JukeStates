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

	//$scope.album = fakeAlbum;

	$http.get('api/albums/')
    .then(function (albums) {
      return albums.data[2]
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
