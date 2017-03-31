(function() {
    "use strict";
    angular.module("common.services")
        .directive('travelerDetail', ['$log', function($log) {
            var controller = ['$scope', '$log', function($scope, $log) {
                $scope.itinerary.adult = $scope.itinerary.adult ? $scope.itinerary.adult : 1;
                $scope.itinerary.child = $scope.itinerary.child ? $scope.itinerary.child : 0;
                $scope.itinerary.infant = $scope.itinerary.infant ? $scope.itinerary.infant : 0;
            }];
            return {
                restrict: 'E',
                scope: {
                    leftMargin: "=leftMargin",
                    submitted: "=",
                    itinerary: "="
                },
                templateUrl: 'app-assets/flight/views/common/travelDetail.html',
                controller: controller,
                link: function(scope) {
                    scope.$watch('leftMargin', function() {});
                }
            }
        }]);
}());