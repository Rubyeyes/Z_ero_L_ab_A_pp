angular.module('MyApp')
	.controller('learnCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', '$anchorScroll', '$location', "$http", 'ArticleCategory', 
		function($scope, $timeout, $mdSidenav, $log, $anchorScroll, $location, $http, ArticleCategory) {
	    $scope.isOpenRight = function(){
	      return $mdSidenav('right').isOpen();
	    };
	    // $scope.articleCategories = ArticleCategory.articlecategories;
	    $scope.articleCategories = [    	
			{
				title: "认识生酮饮食",
				articles: [
					{
						title: "警告",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:"https://mp.weixin.qq.com/s/nEfTMP-cGRSqk11dVxMmcg"
					},
					{
						title: "生酮饮食的历史",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:"https://mp.weixin.qq.com/s/-um1MlvvmO8-le4KEzMaCg"
					},
					{
						title: "生酮饮食有哪些治疗效果",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:"https://mp.weixin.qq.com/s/W5G9DWKWq6A306QnArpZcw"
					},
				]
			},
			{
				title: "科学、原理",
				articles: [
					{
						title: "低脂饮食减肥为什么会让你发胖",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:"https://mp.weixin.qq.com/s/66VI06QsO-4LeOLUt5GaDQ"
					},
					{
						title: "酮体在人体中产生的原理是什么",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "生酮饮食为什么能减肥",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
				]
			},
			{
				title: "开始生酮饮食前必读",
				articles: [
					{
						title: "关于安全-生酮饮食有哪些不良反应",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "关于安全-长期生酮是否安全",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "关于安全-生酮饮食绝对禁忌人群",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "关于安全-哪些人进行生酮饮食需要谨慎",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "开始生酮饮食前我要做什么",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "我需要严格生酮吗",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "我需要生酮多久",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "如何优雅的退出生酮",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
				]
			},
			{
				title: "生酮饮食怎么吃",
				articles: [
					{
						title: "什么能吃",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "什么不能吃、要少吃",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "为什么要少吃水果",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "我应该吃多少，按什么比例吃",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "吃多少碳水化合物",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "常见错误：隐藏碳水化合物",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "吃多少蛋白质",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "吃多少油脂",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "卡路里之谜：到底要不要限制脂肪摄入",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "吃多少次要，测酮体是关键",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "我应该从什么比例开始入门",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "什么时候吃，一天吃几顿",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "如何阅读营养标签",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "如何查询食物营养成分",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
				]
			},
			{
				title: "生酮实践攻略",
				articles: [
					{
						title: "介绍三种酮体",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "如何测量酮体",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "区别：进入生酮状态 vs 生酮适应",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "为什么会有适应期",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "适应期副作用的应对方法",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "爆碳水",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "运动过度、压力过大、睡眠不足",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
				]
			},
			{
				title: "女性生酮",
				articles: [
					{
						title: "生酮饮食会影响月经吗",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
					{
						title: "生酮饮食和PCOS",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
				]
			},
			{
				title: "其他营养相关",
				articles: [
					{
						title: "代糖",
						subtitle: "",
						thumbnailUrl: "",
						articleUrl:""
					},
				]
			}
	    ];
	  	if ($scope.articleCategories[0].articles[0]) {
		    $scope.currentArticleUrl = $scope.articleCategories[0].articles[0].articleUrl;
		    inputArticle($scope.currentArticleUrl)	
	  	}
		
		$scope.toggleLeft = buildDelayedToggler('left');
		// 点击文章
		$scope.articleClick = function (categoryIndex, articleIndex) {
			$scope.currentArticleUrl = $scope.articleCategories[categoryIndex].articles[articleIndex].articleUrl;
	    	inputArticle();
		}
		// 将html中的data-src换成src
		function inputArticle() {
			$http({
				method: "GET",
				url: $scope.currentArticleUrl,
				referer: 'no-referer',
				headers: {
					'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
				}
			})
			.then(function (response){
				var html = response.data;
				html = html.replace(/data-src/g, "");
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