(function () {
    "use strict";
    angular.module("common.services")
    .directive('travellerDetails', function () {
        var controller = ['$scope', '$log', '$state', 'ShareDataService', function ($scope, $log, $state, ShareDataService) {
			
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/common/travellerDetails.html',
            controller: controller,
			scope: {
				itinerary:"="
            }
        }
    });
}());
