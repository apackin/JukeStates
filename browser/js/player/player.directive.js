juke.directive('myplayer', function(PlayerFactory) {
  return {
  	restrict: 'E',
  	link: function ($scope) {
  		 angular.extend($scope, PlayerFactory); // copy props from param2 to param1

		  	$scope.toggle = function () {
		    if ( PlayerFactory.isPlaying() ) PlayerFactory.pause();
		    else PlayerFactory.resume();
		  };

		  $scope.getPercent = function () {
		    return PlayerFactory.getProgress() * 100;
		  };

		  $scope.scrubber = function(event) {
		  	PlayerFactory.scrubber(event);
		  };

  	},
    templateUrl: '/js/player/templates/player.html',
  };
});

juke.directive('songInfo', function(){
	return {
		restrict: 'E',
		templateUrl: '/js/sidebar/templates/song-info.html',
		scope: {
			song: "="
		}
	};
});