(function () {
    "use strict";
    angular.module("common.services")
    .directive('review', function () {
        var controller = ['$scope', function ($scope) {
			
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/oneway/review.html',
            controller: controller,
			scope: {
				itinerary:"="
            }
        }
    });
}());
