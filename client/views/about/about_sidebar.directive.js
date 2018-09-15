angular.module('MyApp')
	.directive('aboutsidebar', function() {
		return {
			templateUrl: '/views/about/about_sidebar.html',
			restrict: 'E',
			controller: 'aboutCtrl'
		};
	});
