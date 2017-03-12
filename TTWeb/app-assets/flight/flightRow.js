(function () {
    "use strict";
    angular.module("common.services")
    .directive('flightRow', function () {
        var controller = ['$scope', '$log', function ($scope, $log) {
			$scope.sorting = function(result) {
				var sort = 0;
				sort = result[$scope.sortby];
				return sort	;
			}
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/flightrow.html',
            controller: controller,
			scope: {
                data: "=",
				sortby: "=",
				sorted:"="
            },
        }
    });
}());
