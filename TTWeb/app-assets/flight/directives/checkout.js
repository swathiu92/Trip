(function() {
    "use strict";
    angular.module("common.services")
        .directive('checkout', function() {
            var controller = ['$scope', '$state', '$filter', '$timeout', '$log', 'ShareDataService', function($scope, $state, $filter, $timeout, $log, ShareDataService) {
                $scope.searchmodel = ShareDataService.getSharedData().searchmodel;
                //$scope.searchmodel.departure = $filter('date')($scope.searchmodel.departure,'MMM dd yyyy');
                console.log($scope.searchmodel);

                $scope.travel = ShareDataService.getSharedData().travel;
                $scope.searchmodel.adultprice = 0;
                $scope.searchmodel.childprice = 0;
                $scope.searchmodel.infantprice = 0;
                $scope.adultInfo = new Array($scope.searchmodel.adult);
                $scope.chidInfo = new Array($scope.searchmodel.child);
                $scope.infantInfo = new Array($scope.searchmodel.infant);
                $scope.firstName = {};
                $scope.middleName = {};
                $scope.lastName = {};
                $scope.travellerInfo = [];
                for (var a = 0; a < $scope.adultInfo.length; a++) {
                    var type1 = a + 1;
                    $scope.travellerInfo.push({
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
                for (var a = 0; a < $scope.chidInfo.length; a++) {
                    var type2 = a + 1;
                    $scope.travellerInfo.push({
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
                for (var a = 0; a < $scope.infantInfo.length; a++) {
                    var type3 = a + 1;
                    $scope.travellerInfo.push({
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

                console.log($scope.searchmodel.bookDetails);
                angular.forEach($scope.searchmodel.bookDetails, function(value, key) {
                    value.adultprice = (value.adultprice) ? (value.adultprice) : 0;
                    value.childprice = (value.childprice) ? (value.childprice) : 0;
                    value.infantprice = (value.infantprice) ? (value.infantprice) : 0;
                    ($scope.searchmodel.adult !== 0) ? ($scope.searchmodel.adultprice = $scope.searchmodel.adultprice + parseInt(value.adultprice) * $scope.searchmodel.adult) : '';
                    ($scope.searchmodel.child !== 0) ? ($scope.searchmodel.childprice = $scope.searchmodel.childprice + parseInt(value.childprice) * $scope.searchmodel.child) : '';
                    ($scope.searchmodel.infant !== 0) ? ($scope.searchmodel.infantprice = $scope.searchmodel.infantprice + parseInt(value.infantprice) * $scope.searchmodel.infant) : '';
                });
                $scope.searchmodel.totalPrice = $scope.searchmodel.adultprice + $scope.searchmodel.childprice + $scope.searchmodel.infantprice;

                $scope.nextPage = false;
                $scope.continueToNextPage = function() {
                    /* $scope.nextPage = true; */
                    $scope.searchmodel.showContainer = 'travellerDetails';
                    console.log($scope.searchmodel);
                    /* $scope.travellerDetails = [];
                    $scope.bookedDetails.travellers = {"adult":$scope.searchmodel.adult, "child":$scope.searchmodel.child, "infant":$scope.searchmodel.infant};
                    $scope.bookedDetails.origin = $scope.searchmodel.
                    $scope.travellerDetails.push($scope.bookedDetails); */

                };
                $scope.backToReview = function() {
                    $scope.searchmodel.showContainer = 'review';
                };
				$scope.addMeals = function(){
					$scope.searchmodel.meals = [];
					$scope.searchmodel.mealsPrice = 0;
					angular.forEach($scope.searchmodel.mealDetails, function(value){
						(value)?($scope.searchmodel.meals.push(value)):"";
						$scope.searchmodel.mealsPrice = $scope.searchmodel.mealsPrice + parseInt(value.price);
					});
				};
                $scope.goToSummary = function() {
                    var moveNext = true;
                    if ($scope.travel.contact && $scope.travel.code) {
                        for (var c = 0; c < $scope.travellerInfo.length; c++) {
                            if (!$scope.travellerInfo[c].firstName || !$scope.travellerInfo[c].lastName || !$scope.travellerInfo[c].title) {
                                moveNext = false;
                                break;
                            }
                        }
                        if (moveNext) {
                            if ($scope.travel && $scope.travel.mealDetails) {
                                var tempArr = [];
                                angular.forEach($scope.travel.mealDetails, function(value, key) {
                                    if (value) {
                                        tempArr.push($scope.mealList[key])
                                    }
                                });
                                $scope.travel.meal = tempArr;
                            }
                            if ($scope.travel && $scope.travel.baggageDetails) {
                                var tempArr = [];
                                angular.forEach($scope.travel.baggageDetails, function(value, key) {
                                    if (value) {
                                        tempArr.push($scope.baggageList[key])
                                    }
                                });
                                $scope.travel.baggage = tempArr[0];

                            }
                            $scope.searchmodel.showContainer = 'summary';
                        }
                    }

                };
                $scope.unselectOther = function(id) {
                    angular.forEach($scope.travel.baggageDetails, function(value, key) {
                        if (id !== Number(key)) {
                            $scope.travel.baggageDetails[key] = false;
                        }
                    });

                };

                $scope.backTosearchmodel = function() {
                    $scope.searchmodel.showContainer = 'travellerDetails';
                };
                $scope.submitBooking = function() {
                    console.log('booking done');
                };
                $scope.myInterval = 5000;
                $scope.baggageList = [{
                    "id": 1,
                    "weight": "5kg (INR 500)",
                    "imagePath": "assets/images/baggage.png"
                }, {
                    "id": 2,
                    "weight": "10kg (INR 1000)",
                    "imagePath": "assets/images/baggage.png"
                }, {
                    "id": 2,
                    "weight": "15kg (INR 1500)",

                    "imagePath": "assets/images/baggage.png"
                }, {
                    "id": 2,
                    "weight": "20kg (INR 2000)",
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
                }];
				$scope.addMeals = function(){
					$scope.searchmodel.meals = [];
					$scope.searchmodel.mealsPrice = 0;
					angular.forEach($scope.searchmodel.mealDetails, function(value){
						(value)?($scope.searchmodel.meals.push(value)):"";
						$scope.searchmodel.mealsPrice = $scope.searchmodel.mealsPrice + parseInt(value.price);
					});
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
                templateUrl: 'app-assets/flight/views/checkout.html',
                controller: controller,
            }
        });
}());