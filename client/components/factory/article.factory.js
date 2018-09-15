angular.module('MyApp')
	.factory('Article', ['$http', 'AdminAuth',  function($http, AdminAuth){
			var o = {
				articles: []
			};
			var i =0;
			//add new article
			o.createBatch = function(article) {
				return $http.post('/api/articles', article, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.articles.push(response.data);
					i++;
				});
			};

			//add new article
			o.create = function(article) {
				return $http.post('/api/articles', article, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					o.articles.push(response.data);
					return response.data;
				});
			};
			//get all articles
			o.getAll = function() {
				return $http.get('/api/articles', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(response) {
					angular.copy(response.data, o.articles);
				});
			};

			// search articles
			o.search = function(keyword) {
				return $http({
					url: '/api/articles/search',
					method: 'GET',
					params: { key_word: keyword }
				}).then(function(response) {
					angular.copy(response.data, o.articles);
				})
			}

			//update a article
			o.update = function(article, updatedArticle) {
				return $http.put('/api/articles/' + article._id + '/edit', updatedArticle, {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
				})
			};
			//remove a article
			o.delete = function(article) {
				return $http.delete('/api/articles/' + article._id + '/delete', {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
				}).then(function(res) {
				})
			}; 
			//get a single article
			o.get = function(id) {
				return $http.get('/api/articles/' + id).then(function(res) {
					headers: {Authorization: 'Bearer '+ AdminAuth.getToken()}
					return res.data;
				});
			};

			return o;
		}])