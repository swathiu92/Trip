(function() {
    "use strict";
    angular.module("common.services")
        .directive('checkoutRound', function() {
            var controller = ['$scope', '$state', '$filter', '$timeout', '$log', 'ShareDataService', function($scope, $state, $filter, $timeout, $log, ShareDataService) {
                $scope.itinerary = ShareDataService.getSharedData().itinerary;
                //$scope.itinerary.departure = $filter('date')($scope.itinerary.departure,'MMM dd yyyy');
                console.log($scope.itinerary);

                $scope.itinerary = ShareDataService.getSharedData().itinerary;
                /* $scope.itinerary.travellerDetails.adultprice = 0;
                $scope.itinerary.travellerDetails.childprice = 0;
                $scope.itinerary.travellerDetails.infantprice = 0;
				$scope.itinerary.travelInfo.mealsPrice = 0;
				$scope.itinerary.travelInfo.baggagePrice = 0; */
                var adultInfo = new Array($scope.itinerary.travellerDetails.adult);
                var chidInfo = new Array($scope.itinerary.travellerDetails.child);
                var infantInfo = new Array($scope.itinerary.travellerDetails.infant);
                $scope.firstName = {};
                $scope.middleName = {};
                $scope.lastName = {};
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
                    /* $scope.nextPage = true; */
                    $scope.itinerary.localObj.showContainer = 'travellerDetails';
                    console.log($scope.itinerary);
                    /* $scope.travellerDetails = [];
                    $scope.bookedDetails.travellers = {"adult":$scope.itinerary.travellerDetails.adult, "child":$scope.itinerary.travellerDetails.child, "infant":$scope.itinerary.travellerDetails.infant};
                    $scope.bookedDetails.origin = $scope.itinerary.
                    $scope.travellerDetails.push($scope.bookedDetails); */

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
                            /* if ($scope.itinerary && $scope.itinerary.mealDetails) {
                                var tempArr = [];
                                angular.forEach($scope.itinerary.mealDetails, function(value, key) {
                                    if (value) {
                                        tempArr.push($scope.mealList[key])
                                    }
                                });
                                $scope.itinerary.meal = tempArr;
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
                /*$scope.unselectOther = function(id) {
					$scope.itinerary.travelInfo.baggagePrice = 0;
                    angular.forEach($scope.itinerary.travelInfo.baggageDetails, function(value, key) {
                        if (id !== Number(key)) {
                            $scope.itinerary.travelInfo.baggageDetails[key] = false;
                        }
						$scope.itinerary.travelInfo.baggage = "";
						if($scope.itinerary.travelInfo.baggageDetails[key]){
							$scope.itinerary.travelInfo.baggage = $scope.itinerary.travelInfo.baggageDetails[key];
							$scope.itinerary.travelInfo.baggagePrice = $scope.itinerary.travelInfo.baggage.price;
						}
						$scope.itinerary.totalExtraPrice = parseInt($scope.itinerary.travelInfo.mealsPrice) + parseInt($scope.itinerary.travelInfo.baggagePrice);
                    });
                };*/

                $scope.backToitinerary = function() {
                    $scope.itinerary.localObj.showContainer = 'travellerDetails';
                };
                $scope.submitBooking = function() {
                    console.log('booking done');
                };
                /* $scope.myInterval = 5000;
                $scope.baggageList = [{
                    "id": 1,
                    "weight": "5kg (INR 500)",
                    "price": "500",
                    "imagePath": "assets/images/baggage.png"
                }, {
                    "id": 2,
                    "weight": "10kg (INR 1000)",
                    "price": "1000",
                    "imagePath": "assets/images/baggage.png"
                }, {
                    "id": 2,
                    "weight": "15kg (INR 1500)",
                    "price": "1500",
                    "imagePath": "assets/images/baggage.png"
                }, {
                    "id": 2,
                    "weight": "20kg (INR 2000)",
                    "price": "2000",
                    "imagePath": "assets/images/baggage.png"
                }]
                $scope.mealList = [{
                    "grp": "Vegetarian",
                    "name": "Veg Samosa and Chai",
                    "price": 230,
                    "code": "OLSC",
                    "mmtPrice": 230,
                    "imagePath": "assets/images/meal.png",
                    "id": 1
                }, {
                    "grp": "Vegetarian",
                    "name": "Veg Sub Roll",
                    "price": 220,
                    "code": "SUVG",
                    "mmtPrice": 220,
                    "imagePath": "assets/images/meal.png",
                    "id": 2
                }, {
                    "grp": "Non Vegetarian",
                    "name": "Non Veg Sub Roll",
                    "price": 220,
                    "code": "SUNV",
                    "mmtPrice": 220,
                    "imagePath": "assets/images/meal.png",
                    "id": 3
                }, {
                    "grp": "Non Vegetarian",
                    "name": "Non Veg Sub and Coke",
                    "price": 260,
                    "code": "OLNB",
                    "mmtPrice": 260,
                    "imagePath": "assets/images/meal.png",
                    "id": 4
                }, {
                    "grp": "Non Vegetarian",
                    "name": "Non Veg Sandwich and Coke",
                    "price": 260,
                    "code": "OLNS",
                    "mmtPrice": 260,
                    "imagePath": "assets/images/meal.png",
                    "id": 5
                }, {
                    "grp": "Vegetarian",
                    "name": "Veg Jain Samosa",
                    "price": 220,
                    "code": "JNML",
                    "mmtPrice": 220,
                    "imagePath": "assets/images/meal.png",
                    "id": 6
                }, {
                    "grp": "Vegetarian",
                    "name": "Veg Samosa(Savoury)",
                    "price": 150,
                    "code": "SAVO",
                    "mmtPrice": 150,
                    "imagePath": "assets/images/meal.png",
                    "id": 7
                }, {
                    "grp": "Non Vegetarian",
                    "name": "Non Vegetarian Sandwich",
                    "price": 220,
                    "code": "SWNV",
                    "mmtPrice": 220,
                    "imagePath": "assets/images/meal.png",
                    "id": 8
                }, {
                    "grp": "Vegetarian",
                    "name": "Vegetarian Sandwich",
                    "price": 220,
                    "code": "SWVG",
                    "mmtPrice": 220,
                    "imagePath": "assets/images/meal.png",
                    "id": 9
                }, {
                    "grp": "Vegetarian",
                    "name": "Veg Sub and Coke",
                    "price": 260,
                    "code": "OLVB",
                    "mmtPrice": 260,
                    "imagePath": "assets/images/meal.png",
                    "id": 10
                }, {
                    "grp": "Vegetarian",
                    "name": "Veg Sandwich and Coke",
                    "price": 260,
                    "code": "OLVS",
                    "mmtPrice": 260,
                    "imagePath": "assets/images/meal.png",
                    "id": 11
                }]; */
				/* $scope.addMeals = function() {
					$scope.itinerary.travelInfo.meals = [];
					$scope.itinerary.travelInfo.mealsPrice = 0;
					angular.forEach($scope.itinerary.mealDetails, function(value){
						(value)?($scope.itinerary.travelInfo.meals.push(value)):"";
						if(value) {
							$scope.itinerary.travelInfo.mealsPrice = $scope.itinerary.travelInfo.mealsPrice + parseInt(value.price);
						}
					});
					$scope.itinerary.totalExtraPrice = parseInt($scope.itinerary.travelInfo.mealsPrice) + parseInt($scope.itinerary.travelInfo.baggagePrice);
				}; */
                

            }];

            return {
                scope: {},
                restrict: 'E',
                templateUrl: 'app-assets/flight/views/roundtrip/checkoutRound.html',
                controller: controller,
            }
        });
}());