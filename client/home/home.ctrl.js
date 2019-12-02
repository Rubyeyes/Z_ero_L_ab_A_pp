angular.module('MyApp')
	.controller('homeCtrl', ['$scope', '$interval', '$filter', 'WebBanner', 'WebSubBanner', function($scope, $interval, $filter, WebBanner, WebSubBanner) {
		// webBanner related variable
		var localWebBanners = WebBanner.webbanners;
		$scope.webBanners = $filter('orderBy')(localWebBanners, 'order');
		$scope.currentIndex = 0
		$scope.currentBanner = $scope.webBanners[$scope.currentIndex];
		$scope.bannerTitleBackground = $scope.currentBanner.title ? "banner_title-background" : null;

		const delayInterval = () => {
			if (intervalId) {
				$interval.cancel(intervalId);
				intervalId = $interval(showNext, 6000);
			}	
		}

		const showNext = () => {
			if ($scope.currentIndex === $scope.webBanners.length-1) {
				$scope.currentIndex = -1;
			}

			$scope.currentIndex += 1;
			$scope.currentBanner = $scope.webBanners[$scope.currentIndex];
			$scope.bannerTitleBackground = $scope.currentBanner.title ? "banner_title-background" : null;
		}

		const showPrev = () => {
			if ($scope.currentIndex == 0) {
				$scope.currentIndex = $scope.webBanners.length;
			}

			$scope.currentIndex -= 1;
			$scope.currentBanner = $scope.webBanners[$scope.currentIndex];
			$scope.bannerTitleBackground = $scope.currentBanner.title ? "banner_title-background" : null;
		}

		$scope.changeBanner = (index) => {
			$scope.currentBanner = $scope.webBanners[index]
			$scope.currentIndex = index
			$scope.bannerTitleBackground = $scope.currentBanner.title ? "banner_title-background" : null;		
			delayInterval();
		}

		const swipeleftHandler = () => {
			showPrev();
			delayInterval();
			$scope.$apply();
		};

		const swiperightHandler = () => {
			showNext();
			delayInterval();
			$scope.$apply();
		};

		$('.banner').on("swipeleft", swipeleftHandler);
		$('.banner').on("swiperight", swiperightHandler);
		
		let intervalId = $interval(showNext, 6000);
	}]);
