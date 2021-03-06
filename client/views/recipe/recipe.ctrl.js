angular.module('MyApp')
	.controller('recipeCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', '$anchorScroll', '$location', "$http",'RecipeCategory', 
		function($scope, $timeout, $mdSidenav, $log, $anchorScroll, $location, $http, RecipeCategory) {
	    $scope.isOpenRight = function(){
	      return $mdSidenav('right').isOpen();
	    };
	    $scope.recipeCategories = RecipeCategory.recipecategories;
		if ($scope.recipeCategories[0].recipes[0]) {
			$scope.currentRecipeUrl = $scope.recipeCategories[0].recipes[0].recipeUrl;
			inputRecipe()	
		}
		
		$scope.toggleLeft = buildDelayedToggler('left');
		// 点击文章
		$scope.recipeClick = function (categoryIndex, recipeIndex) {
			$scope.currentRecipeUrl = $scope.recipeCategories[categoryIndex].recipes[recipeIndex].recipeUrl;
			if ($scope.currentRecipeUrl) {
				inputRecipe();
			}
		}
		// 将html中的data-src换成src
		function inputRecipe() {
			$("iframe").attr("srcdoc", "<h3 style=\"text-align: center; height: calc(100vh - 60px); line-height: calc(100vh - 60px)\">Loading...</h3>");
			$http({
				method: "GET",
				url: $scope.currentRecipeUrl,
			})
			.then(function (response){
				var html = response.data;
				html = html.replace(/https\:\/\/mmbiz\.qpic\.cn/g, `https://cors-anywhere.herokuapp.com/https://mmbiz.qpic.cn`);
				html = html.replace(/http\:\/\/mmbiz\.qpic\.cn/g, `https://cors-anywhere.herokuapp.com/http://mmbiz.qpic.cn`);
				document.querySelector('iframe').contentWindow.document.write(html);
			});
		}
	    /**
	     * Supplies a function that will continue to operate until the
	     * time is up.
	     */
	    function debounce(func, wait, context) {
	      var timer;

	      return function debounced() {
	        var context = $scope,
	            args = Array.prototype.slice.call(arguments);
	        $timeout.cancel(timer);
	        timer = $timeout(function() {
	          timer = undefined;
	          func.apply(context, args);
	        }, wait || 10);
	      };
	    }

	    /**
	     * Build handler to open/close a SideNav; when animation finishes
	     * report completion in console
	     */
	    function buildDelayedToggler(navID) {
	      return debounce(function() {
	        // Component lookup should always be available since we are not using `ng-if`
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            $log.debug("toggle " + navID + " is done");
	          });
	      }, 200);
	    }

	    function buildToggler(navID) {
	      return function() {
	        // Component lookup should always be available since we are not using `ng-if`
	        $mdSidenav(navID)
	          .toggle()
	          .then(function () {
	            $log.debug("toggle " + navID + " is done");
	          });
	      };
	    };

	    // scroll to gotoTop
		$scope.goTop = function() {
			// set the location.hash to the id of
			// the element you wish to scroll to.
			$location.hash('jing-gao');

			// call $anchorScroll()
			$anchorScroll();
		};
	}]) 
	.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
	    $scope.close = function () {
	      // Component lookup should always be available since we are not using `ng-if`
	      $mdSidenav('left').close()

	    };
	  });