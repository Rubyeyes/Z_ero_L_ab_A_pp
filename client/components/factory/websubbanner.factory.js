angular.module('MyApp')
	.factory('WebSubBanner', ['$http', 'AdminAuth',  function($http, AdminAuth){
			var o = {
				websubbanners: []
			};
			var i =0;
			//add new webSubBanner
			o.createBatch = function(webSubBanner) {
				return $http.post('/api/webSubBanners', webSubBanner, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.websubbanners.push(response.data);
					i++;
				});
			};

			//add new webSubBanner
			o.create = function(webSubBanner) {
				return $http.post('/api/webSubBanners', webSubBanner, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.websubbanners.push(response.data);
				});
			};
			//get all webSubBanners
			o.getAll = function() {
				return $http.get('/api/webSubBanners', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					angular.copy(response.data, o.websubbanners);
				});
			};

			// search webSubBanners
			o.search = function(keyword) {
				return $http({
					url: '/api/webSubBanners/search',
					method: 'GET',
					params: { key_word: keyword }
				}).then(function(response) {
					angular.copy(response.data, o.websubbanners);
				})
			}

			//update a webSubBanner
			o.update = function(webSubBanner, updateWebSubBanner) {
				return $http.put('/api/webSubBanners/' + webSubBanner._id + '/edit', updateWebSubBanner, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
					var arrayIndex = o.websubbanners.findIndex(function(element) {
					  return element._id === webSubBanner._id;
					});
					o.websubbanners[arrayIndex] = res.data;
				})
			};
			//remove a webSubBanner
			o.delete = function(webSubBanner) {
				return $http.delete('/api/webSubBanners/' + webSubBanner._id + '/delete', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
					var arrayIndex = o.websubbanners.findIndex(function(element) {
					  return element._id === webSubBanner._id;
					});
					o.websubbanners.splice(arrayIndex,1);
				})
			}; 
			//get a single webSubBanner
			o.get = function(id) {
				return $http.get('/api/webSubBanners/' + id).then(function(res) {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
					return res.data;
				});
			};

			return o;
		}])