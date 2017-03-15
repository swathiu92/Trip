(function () {
    "use strict";
    angular.module("common.services")
    .directive('checkout', function () {
        var controller = ['$scope', '$log', 'ShareDataService', function ($scope, $log, ShareDataService) {
			$scope.cityDetails = ShareDataService.getSharedData().city;
			$scope.travelDetails = ShareDataService.getSharedData().travel;
			$scope.bookedDetails = ShareDataService.getSharedData().bookDetails;
			$scope.adultprice = 0;
			$scope.childprice = 0;
			$scope.infantprice = 0;
			angular.forEach($scope.bookedDetails, function(value, key){
				value.adultprice = (value.adultprice)?(value.adultprice):0;
				value.childprice = (value.childprice)?(value.childprice):0;
				value.infantprice = (value.infantprice)?(value.infantprice):0;
				($scope.cityDetails.adult !== 0)?($scope.adultprice = $scope.adultprice + parseInt(value.adultprice) * $scope.cityDetails.adult):'';
				($scope.cityDetails.child !== 0)?($scope.childprice = $scope.childprice + parseInt(value.childprice) * $scope.cityDetails.child):'';
				($scope.cityDetails.infant !== 0)?($scope.infantprice = $scope.infantprice + parseInt(value.infantprice) * $scope.cityDetails.infant):'';
			});
			$scope.totalPrice = $scope.adultprice + $scope.childprice + $scope.infantprice;
			$scope.promo = function(){
				$scope.selectPromo = !$scope.selectPromo;
			};
			$scope.nextPage = false;
			$scope.continueToNextPage = function(){
				$scope.nextPage = true;
			};
        }];

        return {
            scope: {
			},
            restrict: 'E',
            templateUrl: 'app-assets/flight/checkout.html',
            controller: controller,
        }
    });
}());
