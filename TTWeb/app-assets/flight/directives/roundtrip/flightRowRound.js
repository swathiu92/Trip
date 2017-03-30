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
			$scope.itinerary.cities = [];
			$scope.flightSelected = function(details, status, index){
				
				$scope.itinerary.localObj.showContainer ='review';
				
				/* ShareDataService.setSharedData({
					travel: $scope.data.travel
	            }, 'travel'); */
				ShareDataService.setSharedData({
					itinerary: $scope.itinerary
	            }, 'itinerary');
				$state.go('flightdetails');
			};
			$scope.showBookSection= [];
			$scope.bookThis = function(details, status, index){
				$scope.itinerary.bookDetails = [];
				$scope.itinerary.bookDetails.push(details);
				$scope.itinerary.bookDetails.push($scope.data[status][index]);
				$scope.itinerary.bookDetails[0].from = angular.copy($scope.itinerary.itineraryDetails.from);
				$scope.itinerary.bookDetails[0].to = angular.copy($scope.itinerary.itineraryDetails.to);
				$scope.itinerary.bookDetails[1].from = angular.copy($scope.itinerary.itineraryDetails.to);
				$scope.itinerary.bookDetails[1].to = angular.copy($scope.itinerary.itineraryDetails.from);
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
            templateUrl: 'app-assets/flight/views/roundtrip/flightrowround.html',
            controller: controller,
			scope: {
                data: "=",
				itinerary:"=",
				sortby: "=",
				sorted:"="
            }
        }
    });
}());
