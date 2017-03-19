(function () {
    "use strict";
    angular.module("common.services")
    .directive('travelerDetail', ['$log', function ($log) {
        var controller = ['$scope', '$log', function ($scope, $log) {
			$scope.city.adult = 1;
			$scope.city.child = 0;
			$scope.city.infant = 0;
			
        }];

        return {
            restrict: 'E',
            scope: {
                leftMargin: "=leftMargin",
				submitted: "=",
				city:"="
            },
            templateUrl: 'app-assets/flight/views/travelDetail.html',
            controller: controller,
            link: function (scope) {
                scope.$watch('leftMargin', function () {
                });
            }
        }
    }]);
}());