juke.directive('songsList', function(PlayerFactory){
	return {
		restrict: 'E',
		scope: { 
			songs: "="
		},
		link: function(scope) {
            scope.getCurrentSong = function() {
                return PlayerFactory.getCurrentSong();
            };

            scope.isPlaying = function(song) {
                return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
            };

            scope.toggle = function(song) {
                if (song !== PlayerFactory.getCurrentSong()) {
                    PlayerFactory.start(song, scope.songs);
                } else if (PlayerFactory.isPlaying()) {
                    PlayerFactory.pause();
                } else {
                    PlayerFactory.resume();
                }
            };
        },
		templateUrl: 'js/song/templates/songs.html'
	};
});

juke.directive('doubleClick', function(PlayerFactory){
    return {
        restict: 'A',
        scope: {
            doubleClick: '&'
        },
        link: function(scope, elem) {
            elem.on('dblclick', function () {
                scope.doubleClick();
            });
        }
    };
});