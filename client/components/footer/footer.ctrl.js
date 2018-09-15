'use strict';

angular.module('MyApp')
	.controller('FooterCtrl', ['$scope', 'Info', '$location',function($scope, Info, $location) {
		Info.getAll().then(function(res) {
			$scope.information = res;
		});

		$scope.$on('$stateChangeSuccess',function(){
	        var path = $location.path();
			if(path === '/learn' || path === '/recipe') {
				$scope.footerStyle = {'display': 'none'};	
			} else {
				$scope.footerStyle = {'display': 'block'};	
			};
	    });

	}])