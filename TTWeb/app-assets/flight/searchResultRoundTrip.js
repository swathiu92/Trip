(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchResultRoundTrip', function () {
        var controller = ['$scope', '$log', function ($scope, $log) {

        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/searchresultroundtrip.html',
            controller: controller,
        }
    });
}());
