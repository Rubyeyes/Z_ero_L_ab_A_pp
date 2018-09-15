angular.module('MyApp')
	.factory('ArticleCategory', ['$http', 'AdminAuth',  function($http, AdminAuth){
			var o = {
				articlecategories: []
			};
			var i =0;
			//add new articlecategory
			o.createBatch = function(articlecategory) {
				return $http.post('/api/articlecategories', articlecategory, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.articlecategories.push(response.data);
					i++;
				});
			};

			//add new articlecategory
			o.create = function(articlecategory) {
				return $http.post('/api/articlecategories', articlecategory, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.articlecategories.push(response.data);
				});
			};
			//get all articlecategories
			o.getAll = function() {
				return $http.get('/api/articlecategories', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					angular.copy(response.data, o.articlecategories);
				});
			};

			// search articlecategories
			o.search = function(keyword) {
				return $http({
					url: '/api/articlecategories/search',
					method: 'GET',
					params: { key_word: keyword }
				}).then(function(response) {
					angular.copy(response.data, o.articlecategories);
				})
			}

			//update a articlecategory
			o.update = function(articlecategory, updateArticleCategory) {
				return $http.put('/api/articlecategories/' + articlecategory._id + '/edit', updateArticleCategory, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
					var arrayIndex = o.articlecategories.findIndex(function(element) {
					  return element._id === articlecategory._id;
					});
					o.articlecategories[arrayIndex] = res.data;
				})
			};
			//remove a articlecategory
			o.delete = function(articlecategory) {
				return $http.delete('/api/articlecategories/' + articlecategory._id + '/delete', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
					var arrayIndex = o.articlecategories.findIndex(function(element) {
					  return element._id === articlecategory._id;
					});
					o.articlecategories.splice(arrayIndex,1);
				})
			}; 
			//get a single articlecategory
			o.get = function(id) {
				return $http.get('/api/articlecategories/' + id).then(function(res) {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
					return res.data;
				});
			};

			return o;
		}])