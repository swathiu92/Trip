(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchFlight', ['$log', searchFlight]);
    function searchFlight($log) {
        var controller = ['$scope', '$log','CONSTANTS', function ($scope, $log, CONSTANTS) {
            $scope.searchmodel.travelType = $scope.searchmodel.travelType?$scope.searchmodel.travelType:1;
			$scope.searchmodel.localObj.currentType = $scope.searchmodel.travelType;
            $scope.tripChanged = function (value) {
			   if($scope.searchmodel.localObj.currentType !== value){
				   /* $scope.searchmodel = angular.copy(CONSTANTS.searchmodel);
				   $scope.searchmodel.travelType = value;
				   $scope.searchmodel.localObj.currentType = $scope.searchmodel.travelType; */
			   }
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