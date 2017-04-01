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
			$scope.itinerary.localObj.flightSelected = function(details, status, index){
				$scope.itinerary.bookDetails = [];
				$scope.itinerary.bookDetails.push($scope.itinerary.localObj.destinationBooked);
				$scope.itinerary.bookDetails.push($scope.itinerary.localObj.originBooked);
				$scope.itinerary.localObj.showContainer ='review';
				ShareDataService.setSharedData({
					itinerary: $scope.itinerary
	            }, 'itinerary');
				$state.go('flightdetails');
			};
			$scope.showBookSection= [];
			$scope.bookThis = function(details, status, index){
				$scope.itinerary.localObj[status+'Booked'] = {};
				$scope.itinerary.localObj[status+'Booked'] = details;
				$scope.itinerary.localObj[status+'Selected'] = details.flightno;
				 */$scope.showBookSection[index] = true;
				if($scope.showBookSection && $scope.showBookSection.length>1){
					angular.forEach($scope.showBookSection,function(value,key){
						if(index!==Number(key)){
							$scope.showBookSection[key]= false; 
						}
					});
				}
				var amount = 0;
				if($scope.showBookSection[index]){
					if($scope.itinerary.travellerDetails.adult){
					amount = $scope.itinerary.localObj.originBooked.adultprice*$scope.itinerary.travellerDetails.adult + $scope.itinerary.localObj.destinationBooked.adultprice*$scope.itinerary.travellerDetails.adult
					}
					if($scope.itinerary.travellerDetails.child){
						amount = amount + $scope.itinerary.localObj.originBooked.childprice*$scope.itinerary.travellerDetails.child + $scope.itinerary.localObj.destinationBooked.childprice*$scope.itinerary.travellerDetails.child
					}
					if($scope.itinerary.travellerDetails.infant){
						amount = amount + $scope.itinerary.localObj.originBooked.infantprice*$scope.itinerary.travellerDetails.infant + $scope.itinerary.localObj.destinationBooked.infantprice*$scope.itinerary.travellerDetails.infant					
					}
					$scope.itinerary.localObj.fare = amount;
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
