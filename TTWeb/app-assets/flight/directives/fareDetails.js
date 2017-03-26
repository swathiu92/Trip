(function() {
    "use strict";
    angular.module("common.services")
        .directive('fareDetails', function() {
            var controller = ['$scope', '$state', '$filter', '$timeout', '$log', 'ShareDataService', function($scope, $state, $filter, $timeout, $log, ShareDataService) {
				$scope.status = {openBase: false, openFare: false};
			
            }];

            return {
                scope: {
					searchmodel : "="
				},
                restrict: 'E',
                templateUrl: 'app-assets/flight/views/fareDetails.html',
                controller: controller,
            }
        });
}());