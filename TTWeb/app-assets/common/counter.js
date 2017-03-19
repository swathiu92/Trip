(function () {
    "use strict";
    angular.module("common.services")
    .directive('counter', function () {

        var controller = ['$scope', '$log', function ($scope, $log) {
           $scope.initialCounter = $scope.count;
		   $scope.add = function(){
				$scope.count = $scope.count + 1;
			};
		   $scope.substract = function(){
				$scope.count = $scope.count - 1;
			};			
        }];

        return {
            restrict: 'E',
            scope: {
                count: "="
            },
            templateUrl: 'app-assets/common/counter.html',
            controller: controller,
        }
    });
}());