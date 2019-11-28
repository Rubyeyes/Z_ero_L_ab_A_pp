angular.module('MyApp')
	.controller('recipeCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', '$anchorScroll', '$location', "$http",'RecipeCategory', 
		function($scope, $timeout, $mdSidenav, $log, $anchorScroll, $location, $http, RecipeCategory) {
	    $scope.isOpenRight = function(){
	      return $mdSidenav('right').isOpen();
	    };
	    // $scope.recipeCategories = RecipeCategory.recipecategories;
	    $scope.recipeCategories = [    	
			{
				title: "低碳水食谱",
				recipes: [
					{
						title: "7日无脑食谱",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/sFMTDVlVTqH4E3ex-TdS-Q"
					},
					{
						title: "学生党",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"学生党"
					},
					{
						title: "上班族",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/8qoeVLQuHB877aMe7yOUcA"
					},
					{
						title: "蔬菜最好吃哪些，如何做",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/RWDv-vJzH5kOOm31KgnjqQ"
					},
					{
						title: "舌尖上的断糖美食地图",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/ckATIY7yvDCRYK4x-aAKtg"
					},
					{
						title: "社交场合攻略",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/xxTHp4L5dKoeW7ZQuaHFqw"
					},
					{
						title: "用微波炉电饭煲做断糖饮食",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/pZ6puAMK3rJTQdfEc8N8hg"
					},
					{
						title: "防弹咖啡",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/5AqVCnmYC13qd0X7V5iknw"
					},
					{
						title: "断糖绿奶昔",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/bEofCM0pilaL9mFqx36Wyw"
					},
					{
						title: "脂肪炸弹",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/ugjqtw9UbV1AQOiRt_VbuQ"
					},
					{
						title: "杏仁奶",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/i25o0McXnMFTCluxYxyTSw"
					},
					{
						title: "断糖杯子蛋糕",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/ogrpINtlEOE3XgDCac89ww"
					},
					{
						title: "断糖巧克力慕斯",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/B-jEFR8Fr94IFHiOpByUHQ"
					},
					{
						title: "断糖蛋炒饭",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/Mqyo42fy5qK_sAQNH61jLw"
					},
					{
						title: "断糖热干面",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/dkT9JetfPiX5mqhnDkso5A"
					},
					{
						title: "断糖薯条",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/xRTfjlpWhCY1_MdZjGlnzQ"
					},
					{
						title: "三文鱼奶酪卷",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/He7U5zTAnZTjibVwUe0RJQ"
					},
					{
						title: "断糖月饼",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/7HGZO2gbYqH4dQuYr2gcCg"
					},
					{
						title: "断糖粽子",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/0LQiop8h6_eSSK42PCsPyQ"
					},
					{
						title: "最全面的主食替代品",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/66VI06QsO-4LeOLUt5GaDQ"
					},
					{
						title: "断糖期间吃什么坚果",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/5FeymtyJGqn7MIg1C7sBIg"
					},
					{
						title: "外卖如何吃",
						subtitle: "",
						imgUrl: "",
						recipeUrl:"https://mp.weixin.qq.com/s/2CPZUe9P3ua1laqVAJQXJQ"
					},
				]
			},
	  ];
		if ($scope.recipeCategories[0].recipes[0]) {
			$scope.currentRecipeUrl = $scope.recipeCategories[0].recipes[0].recipeUrl;
			inputArticle($scope.currentRecipeUrl)	
		}
	    
		
		$scope.toggleLeft = buildDelayedToggler('left');
		// 点击文章
		$scope.recipeClick = function (categoryIndex, articleIndex) {
			$scope.currentRecipeUrl = $scope.recipeCategories[categoryIndex].recipes[articleIndex].recipeUrl;
	    	inputArticle();
		}
		// 将html中的data-src换成src
		function inputArticle() {
			$http({
				method: "GET",
				url: $scope.currentRecipeUrl,
				referer: 'no-referer',
				headers: {
					'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
				}
			})
			.then(function (response){
				var html = response.data;
				html = html.replace(/data-src/g, "src");
				var html_src = 'data:text/html;charset=utf-8,' + html;
				$("iframe").attr("srcdoc" , html);
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