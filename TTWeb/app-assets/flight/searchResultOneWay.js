(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultOneWay', ['$log', searchResultOneWay]);
    function searchResultOneWay() {
        var controller = ['$scope', '$log', function ($scope, $log) {
            
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/searchResultOneway.html',
            controller: controller,
        }
    };
}());
