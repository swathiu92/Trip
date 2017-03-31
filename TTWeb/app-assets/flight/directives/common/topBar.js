(function() {
    "use strict";
    angular.module("common.services")
        .directive('topBar', function() {
            var controller = ['$scope', function($scope) {
                $scope.selectedCity = function(city) {
                    $scope.itinerary.localObj.currentCity = city;
                };
            }];
            return {
                restrict: 'E',
                scope: {
                    itinerary: "=",
                    type: "@"
                },
                templateUrl: 'app-assets/flight/views/common/topBar.html',
                controller: controller,
            }
        });
}());