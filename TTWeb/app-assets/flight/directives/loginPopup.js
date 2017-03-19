(function () {
    "use strict";
    angular.module("common.services")
    .directive('loginPopup', function () {
        var controller = ['$scope', '$log', 'ShareDataService', function ($scope, $log, ShareDataService) {
			console.log($scope.nextPage);
			$scope.travelDetails = ShareDataService.getSharedData().travelDetails;
			$scope.bookAsGuest = function(){
				if($scope.travelDetails.showContainer === 'review'){
					$scope.travelDetails.showContainer = 'travellerDetails'
				}
				$scope.nextPage = false;
			};
			$scope.close = function(){
				$scope.nextPage = false;
			};
        }];

        return {
            scope: {
				nextPage:"="
			},
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/loginPopup.html',
            controller: controller,
        }
    });
}());
