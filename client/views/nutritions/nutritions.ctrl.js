angular.module('MyApp')
	.controller('nutritionsCtrl', ['$scope', 'Food', '$mdDialog', function($scope, Food, $mdDialog) {
		$scope.tableAvailable = true;
		$scope.myFoods = Food.foods;

		$scope.viewby = 20;
		$scope.totalItems = $scope.myFoods.length;
		$scope.currentPage = 1;
		$scope.itemsPerPage = $scope.viewby;
		$scope.maxSize = 5; //Number of pager buttons to show
		$scope.numPages = $scope.totalItems/$scope.itemsPerPage + 1;

		$scope.setPage = function (pageNo) {
			$scope.currentPage = pageNo;
		};

		$scope.setItemsPerPage = function(num) {
			$scope.itemsPerPage = num;
			$scope.currentPage = 1; //reset to first page
			$scope.numPages = $scope.totalItems/$scope.itemsPerPage + 1;
			console.log($scope.numPages);
			console.log($scope.itemsPerPage);
		}

		$scope.propertyName = '英文描述';
		$scope.reverse = true;

		$scope.sortBy = function(propertyName) {
			$scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
			$scope.propertyName = propertyName;
		};

		$scope.showtable = function() {
			$scope.tableAvailable = true;
		};

		$scope.showlist = function() {
			$scope.tableAvailable = false;
		};

		$scope.searchNutrition = function() {
			Food.search($scope.nutritionKeyword).then(function() {	
				$scope.totalItems = $scope.myFoods.length;
				$scope.currentPage = 1;
				$scope.numPages = $scope.totalItems/$scope.itemsPerPage + 1;
			});
		}

		// dialog of nutrition detail
		function DialogController($scope, $mdDialog, foodDetail) {
			console.log(foodDetail);
			$scope.foodDetail = foodDetail;
		    $scope.hide = function() {
		      $mdDialog.hide();
		    };

		    $scope.cancel = function() {
		      $mdDialog.cancel();
		    };

		    $scope.answer = function(answer) {
		      $mdDialog.hide(answer);
		    };
		 }

		$scope.showAdvanced = function(ev, foodSingle) {
		    $mdDialog.show({
				controller: DialogController,
				templateUrl: '/views/nutritions/nutri-detail.html',
				locals: {
					foodDetail: foodSingle
				},
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose:true,
				fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		    })
		    .then(function(answer) {
				$scope.status = 'You said the information was "' + answer + '".';
		    }, function() {
				$scope.status = 'You cancelled the dialog.';
		    });
		  };

	}])