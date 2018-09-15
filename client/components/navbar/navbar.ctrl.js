'use strict';

angular.module('MyApp')
	.controller('NavCtrl', ['$scope', '$location', '$state', 'Auth', 'AdminAuth',
					function($scope, $location, $state, Auth, AdminAuth) {
		$scope.isLoggedIn = Auth.isLoggedIn;
		$scope.isAdminLoggedIn = AdminAuth.isLoggedIn;
		$scope.currentUser = Auth.currentUser;
		$scope.isCollapsed = true;
		$scope.isSecondCollapsed = true;

		$scope.isAdmin = function() {
			return Auth.currentRole() === 'admin';
		}

		$scope.collaps = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		$scope.isActive = function(route) {     
			return route === $location.path();
		};

		$scope.logOut = function() {
			Auth.logOut()
			$state.go('home');
		}
		// logout admin section
		$scope.adminLogOut = function() {
			AdminAuth.logOut()
			$state.go('adminlogin');
		};

		$scope.secondCollaps = function() {
			$scope.isSecondCollapsed = !$scope.isSecondCollapsed;
		};

		$scope.secondClose = function() {
			$scope.isSecondCollapsed = true;
		};

		$scope.status = {
			isopen_about: false,
			isopen_articles: false,
		};

	}])