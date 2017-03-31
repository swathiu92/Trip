(function() {
    "use strict";
    angular.module("common.services")
        .directive('confirmation', function() {
            var controller = ['$scope', function($scope) {
				$scope.print = function(){
					window.print();
				};
            }];

            return {
                scope: {
                    itinerary: "="
                },
                restrict: 'E',
                templateUrl: 'app-assets/flight/views/common/confirmation.html',
                controller: controller,
            }
        });
}());