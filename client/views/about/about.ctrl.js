angular.module('MyApp')
	.controller('aboutCtrl', ['$scope', '$location', '$stateParams',function($scope, $location, $stateParams) {
		var urls = {
			default: '#',
			// main categories
			contact: 'views/about/about_contact.html',
			contribution: 'views/about/about_contribution.html',
			share: 'views/about/about_share.html',
			theory: 'views/about/about_theory.html',
			us: 'views/about/about_us.html',

		}

		$scope.aboutUrl = urls[$stateParams.category];
		$scope.currentState = $stateParams.category;

		$scope.show = function(name) {
			$scope.currentState = name;
			switch (name) {
				// main categories
				case 'contact':
					$scope.aboutUrl = urls.contact;
					// $scope.status.isopen_contact = !$scope.status.isopen_contact;
					break;
				case 'contribution':
					$scope.aboutUrl = urls.contribution;
					// $scope.status.isopen_contribution = !$scope.status.isopen_contribution;
					break;
				case 'share':
					$scope.aboutUrl = urls.share;
					// $scope.status.isopen_share = !$scope.status.isopen_share;
					break;
				case 'theory':
					$scope.aboutUrl = urls.theory;
					// $scope.status.isopen_theory = !$scope.status.isopen_theory;
					break;
				case 'us':
					$scope.aboutUrl = urls.us;
					// $scope.status.isopen_us = !$scope.status.isopen_us;
					break;

				// default
				default:
					$scope.aboutUrl = urls.default; 
			}
		}

		$scope.isActive = function(route) { 
			return $scope.currentState === route;
		};
		 
	}])