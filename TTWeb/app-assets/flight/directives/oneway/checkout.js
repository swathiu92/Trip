(function() {
    "use strict";
    angular.module("common.services")
        .directive('checkout', function() {
            var controller = ['$scope', '$state', '$filter', '$timeout', '$log', 'CONSTANTS', 'ShareDataService', function($scope, $state, $filter, $timeout, $log, CONSTANTS, ShareDataService) {
                $scope.itinerary = ShareDataService.getSharedData().itinerary;
                $scope.itinerary = ShareDataService.getSharedData().itinerary;
				$scope.itinerary.travelInfo.mealsPrice = 0;
				$scope.itinerary.travelInfo.baggagePrice = 0;
                var adultInfo = new Array($scope.itinerary.travellerDetails.adult);
                var chidInfo = new Array($scope.itinerary.travellerDetails.child);
                var infantInfo = new Array($scope.itinerary.travellerDetails.infant);
                $scope.itinerary.travellerDetails.travellerInfo = [];
                for (var a = 0; a < adultInfo.length; a++) {
                    var type1 = a + 1;
                     $scope.itinerary.travellerDetails.travellerInfo.push({
                        "type": "Adult " + type1,
                        "text": "Adult",
                        "firstName": '',
                        "middleName": '',
                        "lastName": '',
                        "title": '',
                        "titleList": [{
                            'name': 'Mr.'
                        }, {
                            'name': 'Mrs.'
                        }, {
                            'name': 'Ms.'
                        }]
                    });
                }
				console.log($scope.itinerary.travellerDetails.travellerInfo);
                for (var a = 0; a < chidInfo.length; a++) {
                    var type2 = a + 1;
                    $scope.itinerary.travellerDetails.travellerInfo.push({
                        "type": "Child " + type2,
                        "text": "Child",
                        "firstName": '',
                        "middleName": '',
                        "lastName": '',
                        "title": '',
                        "titleList": [{
                            'name': 'Master'
                        }, {
                            'name': 'Miss'
                        }]
                    });
                }
                for (var a = 0; a < infantInfo.length; a++) {
                    var type3 = a + 1;
                    $scope.itinerary.travellerDetails.travellerInfo.push({
                        "type": "Infant " + type3,
                        "text": "Infant",
                        "firstName": '',
                        "middleName": '',
                        "lastName": '',
                        "title": '',
                        "titleList": [{
                            'name': 'Master'
                        }, {
                            'name': 'Miss'
                        }]
                    });
                }

                console.log($scope.itinerary.bookDetails);
                angular.forEach($scope.itinerary.bookDetails, function(value, key) {
                    value.adultprice = (value.adultprice) ? (value.adultprice) : 0;
                    value.childprice = (value.childprice) ? (value.childprice) : 0;
                    value.infantprice = (value.infantprice) ? (value.infantprice) : 0;
                    ($scope.itinerary.travellerDetails.adult !== 0) ? ($scope.itinerary.travellerDetails.adultprice = $scope.itinerary.travellerDetails.adultprice + parseInt(value.adultprice) * $scope.itinerary.travellerDetails.adult) : '';
                    ($scope.itinerary.travellerDetails.child !== 0) ? ($scope.itinerary.travellerDetails.childprice = $scope.itinerary.travellerDetails.childprice + parseInt(value.childprice) * $scope.itinerary.travellerDetails.child) : '';
                    ($scope.itinerary.travellerDetails.infant !== 0) ? ($scope.itinerary.travellerDetails.infantprice = $scope.itinerary.travellerDetails.infantprice + parseInt(value.infantprice) * $scope.itinerary.travellerDetails.infant) : '';
                });
                $scope.itinerary.travelInfo.totalTravellerPrice = $scope.itinerary.travellerDetails.adultprice + $scope.itinerary.travellerDetails.childprice + $scope.itinerary.travellerDetails.infantprice;
                $scope.itinerary.travelInfo.totalPrice = $scope.itinerary.travellerDetails.adultprice + $scope.itinerary.travellerDetails.childprice + $scope.itinerary.travellerDetails.infantprice + $scope.itinerary.travelInfo.totalFares;

                $scope.nextPage = false;
                $scope.continueToNextPage = function() {
                    $scope.itinerary.localObj.showContainer = 'travellerDetails';
                    console.log($scope.itinerary);

                };
                $scope.backToReview = function() {
                    $scope.itinerary.localObj.showContainer = 'review';
                };
				
                $scope.goToSummary = function() {
                    var moveNext = true;
                    if ($scope.itinerary.travellerDetails.contact && $scope.itinerary.travellerDetails.code) {
                        for (var c = 0; c < $scope.itinerary.travellerDetails.travellerInfo.length; c++) {
                            if (!$scope.itinerary.travellerDetails.travellerInfo[c].firstName || !$scope.itinerary.travellerDetails.travellerInfo[c].lastName || !$scope.itinerary.travellerDetails.travellerInfo[c].title) {
                                moveNext = false;
                                break;
                            }
                        }
                        if (moveNext) {
                            /* if ($scope.itinerary && $scope.itinerary.travelInfo.mealDetails) {
                                var tempArr = [];
                                angular.forEach($scope.itinerary.travelInfo.mealDetails, function(value, key) {
                                    if (value) {
                                        tempArr.push($scope.mealList[key])
                                    }
                                });
                                $scope.itinerary.travelInfo.meal = tempArr;
                            }
                            if ($scope.itinerary && $scope.itinerary.travelInfo.baggageDetails) {
                                var tempArr = [];
                                angular.forEach($scope.itinerary.travelInfo.baggageDetails, function(value, key) {
                                    if (value) {
                                        tempArr.push($scope.baggageList[key])
                                    }
                                });
                                $scope.itinerary.travelInfo.baggage = tempArr[0];

                            } */
                            $scope.itinerary.localObj.showContainer = 'summary';
                        }
                    }

                };
                

                $scope.backToitinerary = function() {
                    $scope.itinerary.localObj.showContainer = 'travellerDetails';
                };
                $scope.submitBooking = function() {
                    console.log('booking done');
                };
                
				
                $scope.hideOlList = function() {
                    $timeout(function() {
                        $(".carousel ol").remove();
                    }, 500);
                };

            }];

            return {
                scope: {},
                restrict: 'E',
                templateUrl: 'app-assets/flight/views/oneway/checkout.html',
                controller: controller,
            }
        });
}());