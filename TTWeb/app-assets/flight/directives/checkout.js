(function () {
    "use strict";
    angular.module("common.services")
    .directive('checkout', function () {
        var controller = ['$scope', '$state', '$filter', '$log', 'ShareDataService', function ($scope, $state, $filter, $log, ShareDataService) {
			$scope.searchmodel = ShareDataService.getSharedData().searchmodel;
			//$scope.searchmodel.departure = $filter('date')($scope.searchmodel.departure,'MMM dd yyyy');
			console.log($scope.searchmodel);
			
			$scope.travel = ShareDataService.getSharedData().travel;
			$scope.adultprice = 0;
			$scope.childprice = 0;
			$scope.infantprice = 0;
			$scope.adultInfo = new Array($scope.searchmodel.adult);
			$scope.chidInfo = new Array($scope.searchmodel.child);
			$scope.infantInfo = new Array($scope.searchmodel.infant);
			$scope.firstName = {};
			$scope.middleName = {};
			$scope.lastName = {};
			$scope.travellerInfo = [];
			for(var a=0;a<$scope.adultInfo.length;a++){
				var type1 = a+1;
				$scope.travellerInfo.push({
					"type":"Adult "+type1 ,
					"text":"Adult",
					"firstName":'',
					"middleName":'',
					"lastName":'',
					"title":'',
					"titleList":[{'name':'Mr.'},{'name':'Mrs.'},{'name':'Ms.'}]				
				});
			}
			for(var a=0;a<$scope.chidInfo.length;a++){
				var type2 = a+1;
				$scope.travellerInfo.push({
					"type":"Child "+type2,
					"text":"Child",
					"firstName":'',
					"middleName":'',
					"lastName":'',
					"title":'',
					"titleList":[{'name':'Master'},{'name':'Miss'}]					
				});
			}
			for(var a=0;a<$scope.infantInfo.length;a++){
				var type3 = a+1;
				$scope.travellerInfo.push({
					"type":"Infant "+type3,
					"text":"Infant",
					"firstName":'',
					"middleName":'',
					"lastName":'',
					"title":'',
					"titleList":[{'name':'Master'},{'name':'Miss'}]	
				});
			}
			
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
			 
			$scope.nextPage = false;
			$scope.continueToNextPage = function(){
				/* $scope.nextPage = true; */
				$scope.searchmodel.showContainer = 'travellerDetails';
				console.log($scope.searchmodel);
				/* $scope.travellerDetails = [];
				$scope.bookedDetails.travellers = {"adult":$scope.searchmodel.adult, "child":$scope.searchmodel.child, "infant":$scope.searchmodel.infant};
				$scope.bookedDetails.origin = $scope.searchmodel.
				$scope.travellerDetails.push($scope.bookedDetails); */
				
			};
			$scope.backToReview = function(){
				$scope.searchmodel.showContainer = 'review';
			};
			$scope.goToSummary = function(){
				var moveNext = true;
				if($scope.travel.contact && $scope.travel.code){
					for(var c=0;c<$scope.travellerInfo.length;c++){
						if(!$scope.travellerInfo[c].firstName || !$scope.travellerInfo[c].middleName || !$scope.travellerInfo[c].lastName || !$scope.travellerInfo[c].title){
							moveNext = false;
							break;
						}
					}
					if(moveNext){
						$scope.searchmodel.showContainer = 'summary';	
					}					
				}
				
			};
			$scope.backTosearchmodel = function(){
				$scope.searchmodel.showContainer = 'travellerDetails';
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
