(function () {
    "use strict";
    angular.module("common.services")
    .directive('travelerDetail', ['$log', function ($log) {
        var controller = ['$scope', '$log', function ($scope, $log) {
			$scope.searchmodel.adult = $scope.searchmodel.adult?$scope.searchmodel.adult:1;
			$scope.searchmodel.child = $scope.searchmodel.child?$scope.searchmodel.child:0;
			$scope.searchmodel.infant = $scope.searchmodel.infant?$scope.searchmodel.infant:0;
			
        }];

        return {
            restrict: 'E',
            scope: {
                leftMargin: "=leftMargin",
				submitted: "=",
				searchmodel:"="
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