angular.module('MyApp')
	.controller('articlesCtrl', ['$scope', '$location', '$stateParams', '$element', function($scope, $location, $stateParams, $element) {

		var urls = {
			default: '#',
			// main categories
			practice: 'views/articles/articles_practice.html',
			recipe: 'views/articles/articles_recipe.html',
			theory: 'views/articles/articles_theory.html',
			women: 'views/articles/articles_women.html',
			// subcategories
			// practice
			rumen: 'views/articles/articles_practice/rumen.html',
			shiwu: 'views/articles/articles_practice/shiwu.html',
			shiying: 'views/articles/articles_practice/shiying.html',
			//recipe
			reganmian: 'views/articles/articles_recipe/reganmian.html',
			beizidangao: 'views/articles/articles_recipe/beizidangao.html',
			//women
			dayima: 'views/articles/articles_women/dayima.html',
			// theory
			yuanli: 'views/articles/articles_theory/yuanli.html',
			dizhiyinshi: 'views/articles/articles_theory/dizhiyinshi.html',

		}

		$scope.articleUrl = urls[$stateParams.category];
		$scope.currentState = $stateParams.category;

		$scope.show = function(name) {
			$scope.currentState = name;
			switch (name) {
				// main categories
				case 'practice':
					$scope.articleUrl = urls.practice;
					break;
				case 'recipe':
					$scope.articleUrl = urls.recipe;
					break;
				case 'theory':
					$scope.articleUrl = urls.theory;
					break;
				case 'women':
					$scope.articleUrl = urls.women;
					break;

				// practice subcategories
				case 'rumen':
					$scope.articleUrl = urls.rumen;
					$scope.status.isopen_practice = false;
					break;
				case 'shiwu':
					$scope.articleUrl = urls.shiwu;
					$scope.status.isopen_practice = false;
					break;
				case 'shiying':
					$scope.articleUrl = urls.shiying;
					$scope.status.isopen_practice = false;
					break;

				// recipe subcategories
				case 'reganmian':
					$scope.articleUrl = urls.reganmian;
					$scope.status.isopen_recipe = false;
					break;
				case 'beizidangao':
					$scope.articleUrl = urls.beizidangao;
					$scope.status.isopen_recipe = false;
					break;

				// women subcategorie
				case 'dayima':
					$scope.articleUrl = urls.dayima;
					$scope.status.isopen_dayima = false;
					break;

				// theory subcategorie
				case 'yuanli':
					$scope.articleUrl = urls.yuanli;
					$scope.status.isopen_theory = false;
					break;
				case 'dizhiyinshi':
					$scope.articleUrl = urls.dizhiyinshi;
					$scope.status.isopen_theory = false;
					break;

				// default
				default:
					$scope.articleUrl = urls.default; 
			}
		}

		$scope.open = function(name) {
			switch (name) {
				// main categories
				case 'practice':
					$scope.status.isopen_practice = !$scope.status.isopen_practice;
					break;
				case 'recipe':
					$scope.status.isopen_recipe = !$scope.status.isopen_recipe;
					break;
				case 'theory':
					$scope.status.isopen_theory = !$scope.status.isopen_theory;
					break;
				case 'women':
					$scope.status.isopen_women = !$scope.status.isopen_women;
					break;

				// default
				default:
					$scope.articleUrl = urls.default; 
			}
		}

		$scope.isActive = function(route) { 
			return $scope.currentState === route;
		};

		$scope.status = {
			isopen_practice: true,
			isopen_women: true,
			isopen_theory: true,
			isopen_recipe: true,
		};
	}])