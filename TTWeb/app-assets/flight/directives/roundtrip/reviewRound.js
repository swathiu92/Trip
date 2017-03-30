(function () {
    "use strict";
    angular.module("common.services")
    .directive('reviewRound', function () {
        var controller = ['$scope', function ($scope) {
			
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/roundtrip/reviewRound.html',
            controller: controller,
			scope: {
				itinerary:"="
            }
        }
    });
}());
