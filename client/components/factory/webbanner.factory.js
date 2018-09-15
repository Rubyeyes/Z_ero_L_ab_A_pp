angular.module('MyApp')
	.factory('WebBanner', ['$http', 'AdminAuth',  function($http, AdminAuth){
			var o = {
				webbanners: []
			};
			var i =0;
			//add new webBanner
			o.createBatch = function(webBanner) {
				return $http.post('/api/webBanners', webBanner, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.webbanners.push(response.data);
					i++;
				});
			};

			//add new webBanner
			o.create = function(webBanner) {
				return $http.post('/api/webBanners', webBanner, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.webbanners.push(response.data);
				});
			};
			//get all webBanners
			o.getAll = function() {
				return $http.get('/api/webBanners', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					angular.copy(response.data, o.webbanners);
				});
			};

			// search webBanners
			o.search = function(keyword) {
				return $http({
					url: '/api/webBanners/search',
					method: 'GET',
					params: { key_word: keyword }
				}).then(function(response) {
					angular.copy(response.data, o.webbanners);
				})
			}

			//update a webBanner
			o.update = function(webBanner, updateWebBanner) {
				return $http.put('/api/webBanners/' + webBanner._id + '/edit', updateWebBanner, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
					var arrayIndex = o.webbanners.findIndex(function(element) {
					  return element._id === webBanner._id;
					});
					o.webbanners[arrayIndex] = res.data;
				})
			};
			//remove a webBanner
			o.delete = function(webBanner) {
				return $http.delete('/api/webBanners/' + webBanner._id + '/delete', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
					var arrayIndex = o.webbanners.findIndex(function(element) {
					  return element._id === webBanner._id;
					});
					o.webbanners.splice(arrayIndex,1);
				})
			}; 
			//get a single webBanner
			o.get = function(id) {
				return $http.get('/api/webBanners/' + id).then(function(res) {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
					return res.data;
				});
			};

			return o;
		}])