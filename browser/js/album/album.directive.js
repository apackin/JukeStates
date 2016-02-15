juke.directive('albumList', function() {
  return {
  	restrict: 'E',
  	scope: {
  		 albums: "="
  	},
    templateUrl: '/js/album/templates/albumsList.html',
  };
});