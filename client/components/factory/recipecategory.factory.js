angular.module('MyApp')
	.factory('RecipeCategory', ['$http', 'AdminAuth',  function($http, AdminAuth){
			var o = {
				recipecategories: []
			};
			var i =0;
			//add new recipecategory
			o.createBatch = function(recipecategory) {
				return $http.post('/api/recipecategories', recipecategory, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.recipecategories.push(response.data);
					i++;
				});
			};

			//add new recipecategory
			o.create = function(recipecategory) {
				return $http.post('/api/recipecategories', recipecategory, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.recipecategories.push(response.data);
				});
			};
			//get all recipecategories
			o.getAll = function() {
				return $http.get('/api/recipecategories', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					angular.copy(response.data, o.recipecategories);
				});
			};

			// search recipecategories
			o.search = function(keyword) {
				return $http({
					url: '/api/recipecategories/search',
					method: 'GET',
					params: { key_word: keyword }
				}).then(function(response) {
					angular.copy(response.data, o.recipecategories);
				})
			}

			//update a recipecategory
			o.update = function(recipecategory, updateRecipeCategory) {
				return $http.put('/api/recipecategories/' + recipecategory._id + '/edit', updateRecipeCategory, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
					var arrayIndex = o.recipecategories.findIndex(function(element) {
					  return element._id === recipecategory._id;
					});
					o.recipecategories[arrayIndex] = res.data;
				})
			};
			//remove a recipecategory
			o.delete = function(recipecategory) {
				return $http.delete('/api/recipecategories/' + recipecategory._id + '/delete', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
					var arrayIndex = o.recipecategories.findIndex(function(element) {
					  return element._id === recipecategory._id;
					});
					o.recipecategories.splice(arrayIndex,1);
				})
			}; 
			//get a single recipecategory
			o.get = function(id) {
				return $http.get('/api/recipecategories/' + id).then(function(res) {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
					return res.data;
				});
			};

			return o;
		}])