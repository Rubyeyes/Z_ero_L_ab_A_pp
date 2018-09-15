angular.module('MyApp')
	.factory('MiniProgramBanner', ['$http', 'AdminAuth',  function($http, AdminAuth){
			var o = {
				miniprogrambanners: []
			};
			var i =0;
			//add new miniProgramBanner
			o.createBatch = function(miniProgramBanner) {
				return $http.post('/api/miniProgramBanners', miniProgramBanner, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.miniprogrambanners.push(response.data);
					i++;
				});
			};

			//add new miniProgramBanner
			o.create = function(miniProgramBanner) {
				return $http.post('/api/miniProgramBanners', miniProgramBanner, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.miniprogrambanners.push(response.data);
				});
			};
			//get all miniProgramBanners
			o.getAll = function() {
				return $http.get('/api/miniProgramBanners', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					angular.copy(response.data, o.miniprogrambanners);
				});
			};

			// search miniProgramBanners
			o.search = function(keyword) {
				return $http({
					url: '/api/miniProgramBanners/search',
					method: 'GET',
					params: { key_word: keyword }
				}).then(function(response) {
					angular.copy(response.data, o.miniprogrambanners);
				})
			}

			//update a miniProgramBanner
			o.update = function(miniProgramBanner, updateMiniProgramBanner) {
				return $http.put('/api/miniProgramBanners/' + miniProgramBanner._id + '/edit', updateMiniProgramBanner, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
					var arrayIndex = o.miniprogrambanners.findIndex(function(element) {
					  return element._id === miniProgramBanner._id;
					});
					o.miniprogrambanners[arrayIndex] = res.data;
				})
			};
			//remove a miniProgramBanner
			o.delete = function(miniProgramBanner) {
				return $http.delete('/api/miniProgramBanners/' + miniProgramBanner._id + '/delete', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
					var arrayIndex = o.miniprogrambanners.findIndex(function(element) {
					  return element._id === miniProgramBanner._id;
					});
					o.miniprogrambanners.splice(arrayIndex,1);
				})
			}; 
			//get a single miniProgramBanner
			o.get = function(id) {
				return $http.get('/api/miniProgramBanners/' + id).then(function(res) {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
					return res.data;
				});
			};

			return o;
		}])