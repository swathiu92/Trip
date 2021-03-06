﻿(function () {
    "use strict";
    angular.module("common.services")
    .directive('sortingTab', function () {
        var controller = ['$scope', '$log', function ($scope, $log) {
            $scope.selectedTab = "price";
            $scope.sorting = "asc";
            $scope.sortFltsEvent = function (event) {
                $scope.selectedTab = event.currentTarget.id;
				$scope.sortby = $scope.selectedTab;
				$scope.sorted = !$scope.sorted;
				if($scope.itinerary.travelType === "roundtrip" && angular.isObject($scope.itinerary)) {
					$scope.itinerary.localObj.selectedIndex = "";
				}
                $("#" + event.currentTarget.id).find('i').toggleClass('fa-angle-down fa-angle-up');
            }
        }];

        return {
            scope: {
				sortby:'=',
				sorted: '=',
				itinerary: '='
			},
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/common/sortingtab.html',
            controller: controller,
        }
    });
}());
