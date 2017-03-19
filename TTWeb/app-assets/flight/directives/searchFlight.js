﻿(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlight', ['$log', searchFlight]);
    function searchFlight($log) {
        var controller = ['$scope', '$log', function ($scope, $log) {
            $scope.searchmodel.travelType = 1;
            $scope.tripChanged = function (value) {
               $scope.searchmodel = {"arrival":new Date(), "departure":new Date(), "adult":1,"infant":0,"child":0};
			   $scope.searchmodel.travelType = value;
            }
        }];

        return {
            restrict: 'E',
            scope: {
				searchmodel: "="
            },
            templateUrl: 'app-assets/flight/views/searchflight.html',
            controller: controller,
        }
    };
}());