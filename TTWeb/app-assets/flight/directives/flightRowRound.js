(function () {
    "use strict";
    angular.module("common.services")
    .directive('flightRowRound', function () {
        var controller = ['$scope', '$log', '$state', 'ShareDataService', function ($scope, $log, $state, ShareDataService) {
			$scope.sorting = function(result) {
				var sort = 0;
				sort = result[$scope.sortby];
				return sort	;
			};
			$scope.sorting1 = function(result) {
				var sort = 0;
				sort = result[$scope.sortby];
				return sort	;
			};
			$scope.searchmodel.cities = [];
			$scope.flightSelected = function(details, status, index){
				$scope.searchmodel.bookDetails = [];
				$scope.searchmodel.showContainer ='review';
				$scope.searchmodel.bookDetails.push(details);
				$scope.searchmodel.bookDetails.push($scope.data[status][index]);
				$scope.searchmodel.bookDetails[0].from = $scope.searchmodel.from;
				$scope.searchmodel.bookDetails[0].to = $scope.searchmodel.to;
				$scope.searchmodel.bookDetails[1].from = $scope.searchmodel.to;
				$scope.searchmodel.bookDetails[1].to = $scope.searchmodel.from;
				ShareDataService.setSharedData({
					travel: $scope.data.travel
	            }, 'travel');
				ShareDataService.setSharedData({
					searchmodel: $scope.searchmodel
	            }, 'searchmodel');
				$state.go('flightdetails');
			};
			$scope.showBookSection= [];
			$scope.bookThis = function(index){
				$scope.showBookSection[index] = true;
				if($scope.showBookSection && $scope.showBookSection.length>1){
					angular.forEach($scope.showBookSection,function(value,key){
						if(index!==Number(key)){
							$scope.showBookSection[key]= false; 
						}
					});
				}
			};
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/flightrowround.html',
            controller: controller,
			scope: {
                data: "=",
				searchmodel:"=",
				sortby: "=",
				sorted:"="
            }
        }
    });
}());
