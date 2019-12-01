angular.module('MyApp')
	.controller('homeCtrl', ['$scope', '$interval', '$filter', 'WebBanner', 'WebSubBanner', function($scope, $interval, $filter, WebBanner, WebSubBanner) {
		// webBanner related variable
		var localWebBanners = WebBanner.webbanners;
		$scope.webBanners = $filter('orderBy')(localWebBanners, 'order');
		$scope.currentIndex = 0
		$scope.currentBanner = $scope.webBanners[$scope.currentIndex];
		$scope.bannerTitleBackground = $scope.currentBanner.title ? "banner_title-background" : null;

		function delayInterval() {
			if (intervalId) {
				$interval.cancel(intervalId);
				intervalId = $interval(showNext, 6000);
			}	
		}

		function showNext() {
			if ($scope.currentIndex === $scope.webBanners.length-1) {
				$scope.currentIndex = -1;
			}

			$scope.currentIndex += 1;
			$scope.currentBanner = $scope.webBanners[$scope.currentIndex];
			$scope.bannerTitleBackground = $scope.currentBanner.title ? "banner_title-background" : null;
		}

		function showPrev() {
			if ($scope.currentIndex == 0) {
				$scope.currentIndex = $scope.webBanners.length;
			}

			$scope.currentIndex -= 1;
			$scope.currentBanner = $scope.webBanners[$scope.currentIndex];
			$scope.bannerTitleBackground = $scope.currentBanner.title ? "banner_title-background" : null;
		}

		$scope.changeBanner = function(index) {
			$scope.currentBanner = $scope.webBanners[index]
			$scope.currentIndex = index
			$scope.bannerTitleBackground = $scope.currentBanner.title ? "banner_title-background" : null;		
			delayInterval();
		}

		$('.banner').on("swipeleft", () => {
			console.log('swipeleft');
			showNext();
			delayInterval()	
		})

		$('.banner').on("swiperight", () => {
			console.log('swiperight');
			showPrev();
			delayInterval()	
		})
		
		let intervalId = $interval(showNext, 6000);
	}]);
