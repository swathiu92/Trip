(function () {
    "use strict";
    angular.module("common.services")
    .directive('travelLocation', function () {
        var controller = ['$scope', '$log', 'flightService', function ($scope, $log, flightService) {
			
			
				flightService.getStates().then(function(data) {
					$scope.states = data;
			});
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
