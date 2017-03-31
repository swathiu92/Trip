(function() {
    "use strict";
    angular.module("common.services")
        .directive('travelSummary', function() {
            var controller = ['$scope', function($scope) {}];

            return {
                scope: {},
                restrict: 'E',
                templateUrl: 'app-assets/flight/views/common/travelSummary.html',
                controller: controller,
            }
        });
}());