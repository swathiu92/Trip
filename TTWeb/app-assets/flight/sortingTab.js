(function () {
    "use strict";
    angular.module("common.services")
    .directive('sortingTab', function () {
        var controller = ['$scope', '$log', function ($scope, $log) {
            $scope.selectedTab = "price";
            $scope.sorting = "asc";
            $scope.sortFltsEvent = function (event) {
                $scope.selectedTab = event.currentTarget.id;
                $("#" + event.currentTarget.id).find('i').toggleClass('fa-angle-down fa-angle-up');
            }
        }];

        return {
            scope: {},
            restrict: 'E',
            templateUrl: 'app-assets/flight/sortingtab.html',
            controller: controller,
        }
    });
}());
