(function() {
    "use strict";
    angular.module("common.services")
        .directive('travelSummary', function() {
            var controller = ['$scope', 'ShareDataService', function($scope, ShareDataService) {
				$scope.itinerary = ShareDataService.getSharedData().itinerary;
                
			}];

            return {
                scope: {},
                restrict: 'E',
                templateUrl: 'app-assets/flight/views/common/travelSummary.html',
                controller: controller,
            }
        });
}());