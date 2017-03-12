(function () {
    "use strict";
    angular.module("common.services")
    .directive('travelLocation', function () {
        var controller = ['$scope', '$log', function ($scope, $log) {
        }];

        return {
            restrict: 'E',
            scope: {
                displayText: "=",
                dateTime: "=",
                city: "=",
				submitted: "="
            },
            templateUrl: 'app-assets/flight/travelLocation.html',
            controller: controller,
        }
    });
}());
