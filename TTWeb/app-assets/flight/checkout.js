(function () {
    "use strict";
    angular.module("common.services")
    .directive('checkout', function () {
        var controller = ['$scope', '$log', 'ShareDataService', function ($scope, $log, ShareDataService) {
			$scope.cityDetails = ShareDataService.getSharedData().city;
			$scope.travelDetails = ShareDataService.getSharedData().travel;
			$scope.bookedDetails = ShareDataService.getSharedData().booked;
			console.log($scope.bookedDetails);
			$scope.promo = function(){
				$scope.selectPromo = !$scope.selectPromo;
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
