(function() {
    "use strict";
    angular.module("common.services")
        .directive('checkout', function() {
            var controller = ['$scope', '$state', '$filter', '$timeout', '$log', 'ShareDataService','flightService',  function($scope, $state, $filter, $timeout, $log, ShareDataService, flightService) {
                $scope.searchmodel = ShareDataService.getSharedData().searchmodel;
                //$scope.searchmodel.departure = $filter('date')($scope.searchmodel.departure,'MMM dd yyyy');
                console.log($scope.searchmodel);

                $scope.searchmodel = ShareDataService.getSharedData().searchmodel;
                $scope.searchmodel.adultprice = 0;
                $scope.searchmodel.childprice = 0;
                $scope.searchmodel.infantprice = 0;
				$scope.searchmodel.code = '';
				$scope.searchmodel.contact = '';
				$scope.searchmodel.baggage = '';
				$scope.searchmodel.meal = '';
				$scope.searchmodel.baggageDetails = '';
				$scope.searchmodel.mealDetails = ''
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
					if(value){
						value.adultprice = (value.adultprice) ? (value.adultprice) : 0;
						value.childprice = (value.childprice) ? (value.childprice) : 0;
						value.infantprice = (value.infantprice) ? (value.infantprice) : 0;
						($scope.searchmodel.adult !== 0) ? ($scope.adultprice = $scope.adultprice + parseInt(value.adultprice) * $scope.searchmodel.adult) : '';
						($scope.searchmodel.child !== 0) ? ($scope.childprice = $scope.childprice + parseInt(value.childprice) * $scope.searchmodel.child) : '';
						($scope.searchmodel.infant !== 0) ? ($scope.infantprice = $scope.infantprice + parseInt(value.infantprice) * $scope.searchmodel.infant) : '';
					}
                });
                $scope.searchmodel.totalPrice = $scope.adultprice + $scope.childprice + $scope.infantprice;

                $scope.nextPage = false;
                $scope.continueToNextPage = function() {
                    $scope.searchmodel.showContainer = 'travellerDetails';
                    console.log($scope.searchmodel);

                };
                $scope.backToReview = function() {
                    $scope.searchmodel.showContainer = 'review';
                };
                $scope.goToSummary = function() {
                    var moveNext = true;
                    if ($scope.searchmodel.contact && $scope.searchmodel.code) {
                        for (var c = 0; c < $scope.travellerInfo.length; c++) {
                            if (!$scope.travellerInfo[c].firstName || !$scope.travellerInfo[c].lastName || !$scope.travellerInfo[c].title) {
                                moveNext = false;
                                break;
                            }
                        }
                        if (moveNext) {
                            if ($scope.searchmodel && $scope.searchmodel.mealDetails) {
                                var tempArr = [];
                                angular.forEach($scope.searchmodel.mealDetails, function(value, key) {
                                    if (value) {
                                        tempArr.push($scope.mealList[key])
                                    }
                                });
                                $scope.searchmodel.meal = tempArr;
                            }
                            if ($scope.searchmodel && $scope.searchmodel.baggageDetails) {
                                var tempArr = [];
                                angular.forEach($scope.searchmodel.baggageDetails, function(value, key) {
                                    if (value) {
                                        tempArr.push($scope.baggageList[key])
                                    }
                                });
                                $scope.searchmodel.baggage = tempArr[0];

                            }
                            $scope.searchmodel.showContainer = 'summary';
                        }
                    }

                };
                $scope.unselectOther = function(id) {
                    angular.forEach($scope.searchmodel.baggageDetails, function(value, key) {
                        if (id !== Number(key)) {
                            $scope.searchmodel.baggageDetails[key] = false;
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
                flightService.getBaggages().then(function(data) {
					$scope.baggageList = data;
				});
				flightService.getMeals().then(function(data) {
					$scope.mealList = data;
				});
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