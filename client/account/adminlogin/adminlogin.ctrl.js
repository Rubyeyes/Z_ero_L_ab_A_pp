angular.module('MyApp')
	.controller('adminLoginCtrl', ['$scope', 'AdminAuth', '$state', function($scope, AdminAuth, $state) {
		$scope.admin = {};
		$scope.submitted = false;
		$scope.err = "";

		$scope.register = function(form) {
			$scope.submitted = true;
			if(form.$valid) {
				AdminAuth.register($scope.admin).then(function(err) {
					if(err) {
						$scope.error = err.message;
					} else {
						$state.go('home');
					}
				});
			}
			
		};

		$scope.logIn = function() {
			$scope.submitted = true;
			AdminAuth.logIn($scope.admin).then(function(err) {
				if(err) {
					$scope.error = err.message;
				} else {
					$state.go('admin');
				}
			});
		};

		$scope.forgetPassword = function() {
			$state.go('forget');
		};

		$scope.resetPassword = function() {
			console.log($scope.forgetEmail);
			var sendEmail = {
				email: $scope.forgetEmail
			}
			AdminAuth.resetPassword(sendEmail).then(function(err) {
				if(err) {
					$scope.error = err.message;
				} else {
					$scope.notice = "An email has been sent to" + sendEmail.email
				}
			})
		}
	}])