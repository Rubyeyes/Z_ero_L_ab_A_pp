angular.module('MyApp')
	.controller('homeCtrl', ['$scope', '$interval', '$filter', 'WebBanner', 'WebSubBanner', function($scope, $interval, $filter, WebBanner, WebSubBanner) {
		// webBanner related variable
		var webBanners = WebBanner.webbanners;
		$scope.webSubBanners = WebSubBanner.websubbanners;
		console.log($scope.webSubBanners)
		webBanners = $filter('orderBy')(webBanners, 'order');
		console.log(webBanners);

		var index = 0;
		$scope.currentBanner = webBanners[index];
		$interval(showNext, 3000);
		function showNext(){
			$scope.currentBanner = webBanners[index++ % webBanners.length];
		}
		
	}]);
