angular.module('MyApp')
	.factory('Recipe', ['$http', 'AdminAuth',  function($http, AdminAuth){
			var o = {
				recipes: []
			};
			var i =0;
			//add new recipe
			o.createBatch = function(recipe) {
				return $http.post('/api/recipes', recipe, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.recipes.push(response.data);
					i++;
				});
			};

			//add new recipe
			o.create = function(recipe) {
				return $http.post('/api/recipes', recipe, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.recipes.push(response.data);
					return response.data;
				});
			};
			//get all recipes
			o.getAll = function() {
				return $http.get('/api/recipes', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					angular.copy(response.data, o.recipes);
				});
			};

			// search recipes
			o.search = function(keyword) {
				return $http({
					url: '/api/recipes/search',
					method: 'GET',
					params: { key_word: keyword }
				}).then(function(response) {
					angular.copy(response.data, o.recipes);
				})
			}

			//update a recipe
			o.update = function(recipe, updatedRecipe) {
				return $http.put('/api/recipes/' + recipe._id + '/edit', updatedRecipe, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
				})
			};
			//remove a recipe
			o.delete = function(recipe) {
				return $http.delete('/api/recipes/' + recipe._id + '/delete', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
				})
			}; 
			//get a single recipe
			o.get = function(id) {
				return $http.get('/api/recipes/' + id).then(function(res) {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
					return res.data;
				});
			};

			return o;
		}])