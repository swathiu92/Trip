(function () {
    "use strict";
    angular.module("common.services")
    .directive('checkout', function () {
        var controller = ['$scope', '$log', 'ShareDataService', function ($scope, $log, ShareDataService) {
			$scope.searchmodel = ShareDataService.getSharedData().searchmodel;
			console.log($scope.searchmodel);
			$scope.travel = ShareDataService.getSharedData().travel;
			$scope.adultprice = 0;
			$scope.childprice = 0;
			$scope.infantprice = 0;
			console.log($scope.searchmodel.bookDetails);
			angular.forEach($scope.searchmodel.bookDetails, function(value, key){
				value.adultprice = (value.adultprice)?(value.adultprice):0;
				value.childprice = (value.childprice)?(value.childprice):0;
				value.infantprice = (value.infantprice)?(value.infantprice):0;
				($scope.searchmodel.adult !== 0)?($scope.adultprice = $scope.adultprice + parseInt(value.adultprice) * $scope.searchmodel.adult):'';
				($scope.searchmodel.child !== 0)?($scope.childprice = $scope.childprice + parseInt(value.childprice) * $scope.searchmodel.child):'';
				($scope.searchmodel.infant !== 0)?($scope.infantprice = $scope.infantprice + parseInt(value.infantprice) * $scope.searchmodel.infant):'';
			});
			$scope.searchmodel.totalPrice = $scope.adultprice + $scope.childprice + $scope.infantprice;
			$scope.promo = function(){
				$scope.selectPromo = !$scope.selectPromo;
			};
			$scope.nextPage = false;
			$scope.continueToNextPage = function(){
				$scope.nextPage = true;
				$scope.searchmodel.showContainer = 'review';
				console.log($scope.searchmodel);
				/* $scope.travellerDetails = [];
				$scope.bookedDetails.travellers = {"adult":$scope.searchmodel.adult, "child":$scope.searchmodel.child, "infant":$scope.searchmodel.infant};
				$scope.bookedDetails.origin = $scope.searchmodel.
				$scope.travellerDetails.push($scope.bookedDetails); */
				
			};
        }];

        return {
            scope: {
			},
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/checkout.html',
            controller: controller,
        }
    });
}());
