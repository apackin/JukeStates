

var app = angular.module('juke', []);

app.controller('mainCtrl', function($scope, $rootScope) {
	
    $scope.keyPress = function (e){
		switch (e) {
			case 32: $rootScope.$broadcast('pauseSong'); break;
			case 37: $rootScope.$broadcast('previousSong'); break;
			case 39: $rootScope.$broadcast('nextSong'); break;
		}
	};


});






















