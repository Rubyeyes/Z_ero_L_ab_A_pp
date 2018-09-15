angular.module('MyApp')
	.factory('MiniProgramSubBanner', ['$http', 'AdminAuth',  function($http, AdminAuth){
			var o = {
				miniprogramsubbanners: []
			};
			var i =0;
			//add new miniProgramSubBanner
			o.createBatch = function(miniProgramSubBanner) {
				return $http.post('/api/miniProgramSubBanners', miniProgramSubBanner, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.miniprogramsubbanners.push(response.data);
					i++;
				});
			};

			//add new miniProgramSubBanner
			o.create = function(miniProgramSubBanner) {
				return $http.post('/api/miniProgramSubBanners', miniProgramSubBanner, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.miniprogramsubbanners.push(response.data);
				});
			};
			//get all miniProgramSubBanners
			o.getAll = function() {
				return $http.get('/api/miniProgramSubBanners', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					angular.copy(response.data, o.miniprogramsubbanners);
				});
			};

			// search miniProgramSubBanners
			o.search = function(keyword) {
				return $http({
					url: '/api/miniProgramSubBanners/search',
					method: 'GET',
					params: { key_word: keyword }
				}).then(function(response) {
					angular.copy(response.data, o.miniprogramsubbanners);
				})
			}

			//update a miniProgramSubBanner
			o.update = function(miniProgramSubBanner, updateMiniProgramSubBanner) {
				return $http.put('/api/miniProgramSubBanners/' + miniProgramSubBanner._id + '/edit', updateMiniProgramSubBanner, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
					var arrayIndex = o.miniprogramsubbanners.findIndex(function(element) {
					  return element._id === miniProgramSubBanner._id;
					});
					o.miniprogramsubbanners[arrayIndex] = res.data;
				})
			};
			//remove a miniProgramSubBanner
			o.delete = function(miniProgramSubBanner) {
				return $http.delete('/api/miniProgramSubBanners/' + miniProgramSubBanner._id + '/delete', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
					var arrayIndex = o.miniprogramsubbanners.findIndex(function(element) {
					  return element._id === miniProgramSubBanner._id;
					});
					o.miniprogramsubbanners.splice(arrayIndex,1);
				})
			}; 
			//get a single miniProgramSubBanner
			o.get = function(id) {
				return $http.get('/api/miniProgramSubBanners/' + id).then(function(res) {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
					return res.data;
				});
			};

			return o;
		}])