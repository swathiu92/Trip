(function () {
    "use strict";
    angular.module("common.services")
    .directive('reviewMulti', function () {
        var controller = ['$scope', function ($scope) {
			
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/multi/reviewMulti.html',
            controller: controller,
			scope: {
				itinerary:"="
            }
        }
    });
}());
