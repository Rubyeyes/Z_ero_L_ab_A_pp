angular.module('MyApp')
	.factory('AdminAuth', ['$http', '$window', '$q', function($http, $window, $q) {
			var adminauth = {};

			adminauth.saveToken = function(token) {
				$window.localStorage['ma-admin-token'] = token;
			};

			adminauth.getToken = function() {
				return $window.localStorage['ma-admin-token'];
			};

			adminauth.isLoggedIn = function() {
				var token = adminauth.getToken();

				if(token) {
					var payload = JSON.parse($window.atob(token.split('.')[1]));

					return payload.exp > Date.now() / 1000;
				} else {
					return false;
				}
			};

			adminauth.register = function(admin) {
				return $http.post('/api/admins/register', admin).then(function(response) {
					adminauth.saveToken(response.data.token);
				});
			};

			adminauth.logIn = function(admin) {
				return $http.post('/api/admins/login', admin).then(function(response) {
					adminauth.saveToken(response.data.token);
				}, function(err) {
					return err.data;
				})
			};

			adminauth.logOut = function() {
				$window.localStorage.removeItem('ma-admin-token');
			};

			adminauth.currentUser = function() {
				var token = adminauth.getToken();

				if(token) {
					var payload = JSON.parse($window.atob(token.split('.')[1]));
					return payload.adminname;
				} else {
					return false;
				}
			};

			adminauth.currentRole = function() {
				var token = adminauth.getToken();

				if(token) {
					var payload = JSON.parse($window.atob(token.split('.')[1]));
					return payload.role;
				} else {
					return false;
				}
			};

			adminauth.getUserInfo = function() {
				var token = adminauth.getToken();

				if(token) {
					var payload = JSON.parse($window.atob(token.split('.')[1]));
					var id = payload._id
					return $http.get('/api/admins/' + id).then(function(response) {
						return	response.data;
					})
				} else {
					return false;
				}
			};

			adminauth.getUsersNameEmail = function() {
				return $http.get('/api/admins/adminsnameemail').then(function(response) {
					return response.data;
				})
			};

			adminauth.resetPassword = function(email) {
				return $http.post('/api/admins/forget', email).then(function(err, response) {
					if(err) {
						console.log(err);
						return err;
					}
					return response.data;
				})
			}

			return adminauth;
		}])