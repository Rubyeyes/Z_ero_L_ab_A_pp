angular.module('MyApp')
	.controller('calculationCtrl', ['$scope', '$filter','$q', '$timeout', function($scope, $filter, $q, $timeout) {
		$scope.user = {}

		// sex
		$scope.sexes = [
			{ id: 1, description: '男' },
			{ id: 2, description: '女' }
		];

		// height
		$scope.heightInch = function() {
			var height_inch = ($scope.user.height*0.0328084 - $filter('number')($scope.user.height*0.0328084, 0))*12
			return height_inch;
		}

		// age
		// $scope.myDate = new Date(1990, 0, 1);
		// var currentDate = new Date();
		// $scope.user.age = Math.ceil(Math.abs(currentDate - $scope.myDate) / (1000 * 3600 * 24))/365 -1; 


		// bmr\
		$scope.myBmr = function() {
			// $scope.user.age = Math.ceil(Math.abs(currentDate - $scope.myDate) / (1000 * 3600 * 24))/365 -1; 
			if($scope.user.sex) {
				if($scope.user.sex.id == 1) {
					$scope.user.bmr = 10 * $scope.user.weight + 6.25 * $scope.user.height - 5 * $scope.user.age + 5
				} else if ($scope.user.sex.id == 2) {
					$scope.user.bmr = 10 * $scope.user.weight + 6.25 * $scope.user.height - 5 * $scope.user.age -161
				} 
				return $scope.user.bmr;
			} 
		}

		$scope.show_img = false
		$scope.getImgSrc = function() {
			if($scope.user.sex) {
				$scope.show_img = true;
				if($scope.user.sex.id == 1) {
					$scope.img_src =  "/assets/image/calculator/body-fat-percentage-men.jpg"
				} else if ($scope.user.sex.id == 2) {
					$scope.img_src = "/assets/image/calculator/body-fat-percentage-women.jpg"
				}
			}
			
		}

		// active level
		$scope.actLvls = [
			{ id: 1, description: '习惯于久坐。很少有运动。例如办公室工作。' },
			{ id: 2, description: '少许活动量。每周1-3小时。例如零售业工作，需要一些走动的轻微运动量。' },
			{ id: 3, description: '中等活动量。每周3-5小时。例如每天15分钟的自行车和每周3次力量训练（提重物）。' },
			{ id: 4, description: '大量活动量。每周6-7天的繁重体力工作。例如建筑工人。' }
		];

		$scope.user.engExp = 0;
		$scope.myEngExp = function() {
			if($scope.user.lvl) {
				if($scope.user.lvl.id == 1) {
					$scope.user.engExp = $scope.user.bmr * 1.0998 * 1.1;
				} else if ($scope.user.lvl.id == 2) {
					$scope.user.engExp = $scope.user.bmr * 1.2319 * 1.1;
				} else if ($scope.user.lvl.id == 3) {
					$scope.user.engExp = $scope.user.bmr * 1.3859 * 1.1;
				} else if ($scope.user.lvl.id == 4) {
					$scope.user.engExp = $scope.user.bmr * 1.6166 * 1.1;
				}
				return $scope.user.engExp;
			}
			
		}

		// weight goal
		$scope.goals = [
			{ id: 1, description: '减少体重' },
			{ id: 2, description: '保持身材' },
			{ id: 3, description: '增加体重' },
		];

		var updateDiff = function () {
			if($scope.user.goal) {
				if ($scope.user.goal.id ==1) {
					$scope.user.diff = - $scope.user.diff_minus;
				} else if ($scope.user.goal.id ==3) {
					$scope.user.diff = $scope.user.diff_plus;
				} else if ( $scope.user.goal.id ==2 ) {
					$scope.user.diff = 0;
				}
			}
		} 

		$scope.checkGoal = function (id) {
			updateDiff()
			if($scope.user.goal) {
				return $scope.user.goal.id == id;
			}
		}


		// protein
		$scope.proteinMin = function() {
			var protein_min = ($scope.user.weight * (1 - $scope.user.bfr/100)) * 1.3 + 2;
			return protein_min;
		}

		$scope.proteinMax = function() {
			var protein_max = ($scope.user.weight * (1 - $scope.user.bfr/100)) * 2.2;
			return protein_max;
		}

		// total energy and total fat
		$scope.user.diff = 0;
		var updateEng = function() {
			updateDiff();
			$scope.user.energy = $scope.user.engExp * ( 1 + $scope.user.diff/100) ;
			return $scope.user.energy
		};
		var updateFat = function() {
			updateDiff();
			$scope.user.fat = ($scope.user.engExp * ( 1 + $scope.user.diff/100 ) - $scope.user.carb*4 - $scope.user.protein*4)/9;
			return $scope.user.fat
		};

		$scope.$watch('user.diff', updateFat);
		$scope.$watch('user.diff_plus', updateFat);
		$scope.$watch('user.diff_minus', updateFat);
		$scope.$watch('user.engExp', updateFat);
		$scope.$watch('user.carb', updateFat);
		$scope.$watch('user.protein', updateFat);
		$scope.$watch('user.diff', updateEng);
		$scope.$watch('user.engExp', updateEng);
		$scope.$watch('user.diff_minus', updateEng);
		$scope.$watch('user.diff_plus', updateEng);
		
		// show hide panel
		var currentFormId = 0;
		$scope.showMR = false;
		$scope.showDE = false;
		$scope.showEF = false;
		var fullFilled = false;
		$scope.checkForm = function(id) {
			var deferred = $q.defer()
			if(id == 0) {
				fullFilled = true;
			}

			if(id == 1) {
				if(!$scope.user.sex || !$scope.user.weight || !$scope.user.height || !$scope.user.age) {		
					fullFilled = false; 
				} else {
					fullFilled = true
					$scope.showMR = true;
				}
			}
			if(id == 2) {
				if(!$scope.user.lvl ) {
					fullFilled = false; 
				} else {
					fullFilled = true;
					$scope.showDE = true; 
				}
			}
			if(id == 3) {
				if(!$scope.user.bfr ) {
					fullFilled = false; 
				} else {
					fullFilled = true; 
				}
			}
			if(id == 4) {
				if(!$scope.user.carb ) {
					fullFilled = false; 
				} else {
					fullFilled = true; 
				}
			}
			if(id == 5) {
				if(!$scope.user.protein ) {
					fullFilled = false; 
				} else {
					fullFilled = true; 
				}
			}
			if(id == 6) {
				if(!$scope.user.goal ) {
					fullFilled = false; 
				} else {
					fullFilled = true; 
				}
			}
			if(id == 7) {

				if(!$scope.user.diff_minus && !$scope.user.diff_plus && ($scope.user.goal.id !== 2) ) {
					fullFilled = false; 
				} else {
					fullFilled = true; 
					$scope.showEF = true;
				}
			}

			if(fullFilled) {
				deferred.resolve('Hello,!');
			} else {
				deferred.reject('Greeting is not allowed.');
			}

			return deferred.promise;

		}
		$scope.showForm = function(id) {
			return currentFormId == id;
		}
		$scope.nextForm = function(id) {
			$scope.checkForm(id).then(function() {
				currentFormId = id + 1;
				fullFilled = false;
			}, function() {
			});
			
		}
		$scope.prevForm = function(id) {
			currentFormId = id - 1;
		}


	}])