angular.module('MyApp', [
			'ui.router',
			'ngAnimate', 
			'ngSanitize',
			'ui.bootstrap',
			'ngAria',
			'ngMaterial',
			'ngMessages',
			'cfp.loadingBar',
			'ngSanitize'
		])
		.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider',
				function($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider){
			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: '/home/home.html',
					controller: 'homeCtrl',
					data: {
						title: 'ZERO实验室_低碳水高脂肪适量蛋白质_生酮饮食_科普'
					},
				    resolve: {
						webbanners: ['WebBanner', '$state', function(WebBanner, $state) {
								return WebBanner.getAll();
						}],
						websubbanners: ['WebSubBanner', '$state', function(WebSubBanner, $state) {
								return WebSubBanner.getAll();
						}]
				    }
				})
				.state('login', {
					url: '/login',
					templateUrl: '/account/auth/login.html',
					controller: 'AuthCtrl',
					data: {
						title: '登陆_ZERO实验室'
					},
					onEnter: ['$state', 'Auth', function($state, Auth) {
						if(Auth.isLoggedIn()) {
							$state.go('home');
						}
					}]
				})
				.state('register', {
					url: '/register',
					templateUrl: '/account/auth/register.html',
					controller: 'AuthCtrl',
					data: {
						title: '注册_ZERO实验室'
					},
					onEnter: ['$state', 'Auth', function($state, Auth) {
						if(Auth.isLoggedIn()) {
							$state.go('home');
						}
					}]
				})
				.state('calculation', {
					url: '/calculator',
					templateUrl: '/views/calculation/calculation.html',
					controller: 'calculationCtrl',
					data: {
						title: 'ZERO生酮计算器_精确计算生酮饮食每日所需三大营养物质_ZERO实验室'
					}	
				})
				.state('learn', {
					url: '/learn',
					templateUrl: '/views/learn/learn.html',
					controller: 'learnCtrl',
					data: {
						title: '生酮饮食知识库_FAQ_ZERO实验室'
					},
				    resolve: {
						articlecategories: ['ArticleCategory', function(ArticleCategory) {
							return ArticleCategory.getAll();
						}],
				    }	
				})
				.state('recipe', {
					url: '/recipe',
					templateUrl: '/views/recipe/recipe.html',
					controller: 'recipeCtrl',
					data: {
						title: '低碳水饮食食谱_生酮饮食食谱'
					},
				    resolve: {
						recipecategories: ['RecipeCategory', function(RecipeCategory) {
							return RecipeCategory.getAll();
						}],
				    }
				})
				.state('gigl', {
					url: '/gigl',
					templateUrl: '/views/gigl/gigl.html',
					controller: 'giglCtrl',
					data: {
						title: '升糖指数_升糖负荷gigl_ZERO实验室'
					}	
				})
				.state('nutritions', {
					url: '/nutritions',
					templateUrl: '/views/nutritions/nutritions.html',
					controller: 'nutritionsCtrl',
					data: {
						title: ''
					},
					resolve: {
						food: ['Food', function(Food) {
							return Food.getAll();
						}]
					}	
				})
				.state('about', {
					url: '/about?category',
					templateUrl: '/views/about/about.html',
					controller: 'aboutCtrl',
					data: {
						title: ''
					}	
				})
				.state('articles', {
					url: '/articles?category',
					templateUrl: '/views/articles/articles.html',
					controller: 'articlesCtrl',
					data: {
						title: ''
					}	
				})
				.state('support', {
					url: '/support',
					templateUrl: '/views/support/support.html',
					controller: 'supportCtrl',
					data: {
						title: ''
					}	
				})
				.state('admin', {
					url: '/admin',
					templateUrl: '/account/admin/admin.html',
					controller: 'adminCtrl',
					data: {
						title: 'ZERO实验室管理员版面'
					},
				    onEnter: ['$state', 'AdminAuth',function($state, AdminAuth){
			    		if(!AdminAuth.isLoggedIn()) {
							console.log("You are not admin")
							$state.go('adminlogin');
						}
				    }],
				    resolve: {
						articlecategories: ['ArticleCategory', 'AdminAuth', '$state', function(ArticleCategory, AdminAuth, $state) {
							if(!AdminAuth.isLoggedIn()) {
								console.log("You are not admin")
								$state.go('adminlogin');
							} else {
								return ArticleCategory.getAll();
							}
						}],
						recipecategories: ['RecipeCategory', 'AdminAuth', '$state', function(RecipeCategory, AdminAuth, $state) {
							if(!AdminAuth.isLoggedIn()) {
								console.log("You are not admin")
								$state.go('adminlogin');
							} else {
								return RecipeCategory.getAll();
							}
						}],
						webbanners: ['WebBanner', 'AdminAuth', '$state', function(WebBanner, AdminAuth, $state) {
							if(!AdminAuth.isLoggedIn()) {
								console.log("You are not admin")
								$state.go('adminlogin');
							} else {
								return WebBanner.getAll();
							}
						}],
						websubbanners: ['WebSubBanner', 'AdminAuth', '$state', function(WebSubBanner, AdminAuth, $state) {
							if(!AdminAuth.isLoggedIn()) {
								console.log("You are not admin")
								$state.go('adminlogin');
							} else {
								return WebSubBanner.getAll();
							}
						}],
						miniprogrambanners: ['MiniProgramBanner', 'AdminAuth', '$state', function(MiniProgramBanner, AdminAuth, $state) {
							if(!AdminAuth.isLoggedIn()) {
								console.log("You are not admin")
								$state.go('adminlogin');
							} else {
								return MiniProgramBanner.getAll();
							}
						}],
						miniprogramsubbanners: ['MiniProgramSubBanner', 'AdminAuth', '$state', function(MiniProgramSubBanner, AdminAuth, $state) {
							if(!AdminAuth.isLoggedIn()) {
								console.log("You are not admin")
								$state.go('adminlogin');
							} else {
								return MiniProgramSubBanner.getAll();
							}
						}]
				    }
				})
				.state('adminlogin', {
					url: '/admin/login',
					templateUrl: '/account/adminlogin/adminlogin.html',
					controller: 'adminLoginCtrl',
					data: {
						title: 'ZERO实验室管理员登录'
					},
				    onEnter: ['$state', 'AdminAuth',function($state, AdminAuth){
			    		if(AdminAuth.isLoggedIn()) {
							$state.go('admin');
						}
				    }]
				})
				

			$urlRouterProvider.otherwise('home');
		    //user html5 route mode
		    $locationProvider.html5Mode(true);
		    
		}])
		.run(['$state', '$rootScope', 'cfpLoadingBar', function($state, $rootScope, cfpLoadingBar) {
		    $rootScope.$on('$stateChangeStart', function () {
		    		$rootScope.$state = $state;
		    });
		    $rootScope.$on('$stateChangeStart', 
				function(event, toState, toParams, fromState, fromParams){ 
			    	cfpLoadingBar.start();
			})

			$rootScope.$on('$stateChangeSuccess', 
				function(event, toState, toParams, fromState, fromParams){
			    	cfpLoadingBar.complete();
			})
		}]);
		
		
		