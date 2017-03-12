(function () {
    "use strict";
    angular.module("common.services")
    .directive('ttuTime', function () {
        var controller = ['$scope', '$log', function ($scope, $log) {
            $scope.onEnter = function (keyEvent) {
                if (keyEvent.which === 13)
                    ;
            }

        }];

        return {
            restrict: 'E',
            scope: {
                displayText: "=",
                time: "="
            },
            templateUrl: 'app-assets/common/ttutime.html',
            controller: controller,
        }
    });
}());