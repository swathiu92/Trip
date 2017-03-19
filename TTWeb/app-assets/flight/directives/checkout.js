(function () {
    "use strict";
    angular.module("common.services")
    .directive('checkout', function () {
        var controller = ['$scope', '$state', '$log', 'ShareDataService', function ($scope, $state, $log, ShareDataService) {
			$scope.travelDetails = ShareDataService.getSharedData().travelDetails;
			console.log($scope.travelDetails);
			$scope.travel = ShareDataService.getSharedData().travel;
			$scope.adultprice = 0;
			$scope.childprice = 0;
			$scope.infantprice = 0;
			console.log($scope.travelDetails.bookDetails);
			angular.forEach($scope.travelDetails.bookDetails, function(value, key){
				value.adultprice = (value.adultprice)?(value.adultprice):0;
				value.childprice = (value.childprice)?(value.childprice):0;
				value.infantprice = (value.infantprice)?(value.infantprice):0;
				($scope.travelDetails.adult !== 0)?($scope.adultprice = $scope.adultprice + parseInt(value.adultprice) * $scope.travelDetails.adult):'';
				($scope.travelDetails.child !== 0)?($scope.childprice = $scope.childprice + parseInt(value.childprice) * $scope.travelDetails.child):'';
				($scope.travelDetails.infant !== 0)?($scope.infantprice = $scope.infantprice + parseInt(value.infantprice) * $scope.travelDetails.infant):'';
			});
			$scope.travelDetails.totalPrice = $scope.adultprice + $scope.childprice + $scope.infantprice;
			$scope.promo = function(){
				$scope.selectPromo = !$scope.selectPromo;
			};
			$scope.nextPage = false;
			$scope.continueToNextPage = function(){
				/* $scope.nextPage = true; */
				$scope.travelDetails.showContainer = 'travellerDetails';
				console.log($scope.travelDetails);
				/* $scope.travellerDetails = [];
				$scope.bookedDetails.travellers = {"adult":$scope.travelDetails.adult, "child":$scope.travelDetails.child, "infant":$scope.travelDetails.infant};
				$scope.bookedDetails.origin = $scope.travelDetails.
				$scope.travellerDetails.push($scope.bookedDetails); */
				
			};
			$scope.backToFlightSelect = function(){
				$state.go('searchflight');
			};
			$scope.backToReview = function(){
				$scope.travelDetails.showContainer = 'review';
			};
			$scope.goToSummary = function(){
				$scope.travelDetails.showContainer = 'summary';
			};
			$scope.backToTravelDetails = function(){
				$scope.travelDetails.showContainer = 'travellerDetails';
			};
			$scope.submitBooking = function(){
				console.log('booking done');
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
