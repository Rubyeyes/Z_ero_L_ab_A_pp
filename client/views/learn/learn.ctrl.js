angular.module('MyApp')
	.controller('learnCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', '$anchorScroll', '$location', "$http", 'ArticleCategory', 
		function($scope, $timeout, $mdSidenav, $log, $anchorScroll, $location, $http, ArticleCategory) {
	    $scope.isOpenRight = function(){
	      return $mdSidenav('right').isOpen();
	    };
	    $scope.articleCategories = ArticleCategory.articlecategories;
		if ($scope.articleCategories[0].articles[0]) {
			$scope.currentArticleUrl = $scope.articleCategories[0].articles[0].articleUrl;
			inputArticle()	
		}
		
		$scope.toggleLeft = buildDelayedToggler('left');
		// 点击文章
		$scope.articleClick = function (categoryIndex, articleIndex) {
			$scope.currentArticleUrl = $scope.articleCategories[categoryIndex].articles[articleIndex].articleUrl;
	    inputArticle();
		}
		// 将html中的data-src换成src
		function inputArticle() {
			$("iframe").attr("srcdoc", "<h3 style=\"text-align: center; height: calc(100vh - 60px); line-height: calc(100vh - 60px)\">Loading...</h3>");
			$http({
				method: "GET",
				url: $scope.currentArticleUrl,
			})
			.then(function (response){
				var html = response.data;
				html = html.replace(/https\:\/\/mmbiz\.qpic\.cn/g, `https://cors-anywhere.herokuapp.com/https://mmbiz.qpic.cn`);
				html	= html.replace(/http\:\/\/mmbiz\.qpic\.cn/g, `https://cors-anywhere.herokuapp.com/http://mmbiz.qpic.cn`);
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