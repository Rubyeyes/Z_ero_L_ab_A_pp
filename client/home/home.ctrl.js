angular.module('MyApp')
	.controller('homeCtrl', ['$scope', '$interval', '$filter', 'WebBanner', 'WebSubBanner', function($scope, $interval, $filter, WebBanner, WebSubBanner) {
		// webBanner related variable
		var localWebBanners = WebBanner.webbanners;
		$scope.webBanners = $filter('orderBy')(localWebBanners, 'order');
		$scope.currentIndex = 0
		$scope.currentBanner = $scope.webBanners[$scope.currentIndex];

		function showNext(){
			if ($scope.currentIndex == $scope.webBanners.length-1) {
				$scope.currentIndex = -1;
			}

			$scope.currentIndex += 1;
			$scope.currentBanner = $scope.webBanners[$scope.currentIndex];
			$scope.bannerTitleBackground = $scope.currentBanner.title ? "banner_title-background" : null;

		}

		$scope.changeBanner = function(index) {
			$scope.currentBanner = $scope.webBanners[index]
			$scope.currentIndex = index
			$scope.bannerTitleBackground = $scope.currentBanner.title ? "banner_title-background" : null
		}
		
		$interval(() => {
			showNext();
		}, 6000);
	}]);
