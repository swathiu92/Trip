(function () {
    "use strict";
    angular.module("common.services")
    .directive('serviceRequests', function () {
        var controller = ['$scope','$timeout', function ($scope, $timeout) {
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
                }];
				$scope.addMeals = function() {
					$scope.itinerary.travelInfo.meals = [];
					$scope.itinerary.travelInfo.mealsPrice = 0;
					angular.forEach($scope.itinerary.travelInfo.mealDetails, function(value){
						(value)?($scope.itinerary.travelInfo.meals.push(value)):"";
						if(value) {
							$scope.itinerary.travelInfo.mealsPrice = $scope.itinerary.travelInfo.mealsPrice + parseInt(value.price);
						}
					});
					$scope.itinerary.travelInfo.totalExtraPrice = parseInt($scope.itinerary.travelInfo.mealsPrice) + parseInt($scope.itinerary.travelInfo.baggagePrice);
					$scope.itinerary.travelInfo.totalPrice = $scope.itinerary.travelInfo.totalTravellerPrice + $scope.itinerary.travelInfo.totalFares + $scope.itinerary.travelInfo.totalExtraPrice;
				};
				$scope.hideOlList = function() {
                    $timeout(function() {
                        $(".carousel ol").remove();
                    }, 500);
                };
				$scope.unselectOther = function(id) {
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
						$scope.itinerary.travelInfo.totalExtraPrice = parseInt($scope.itinerary.travelInfo.mealsPrice) + parseInt($scope.itinerary.travelInfo.baggagePrice);
						$scope.itinerary.travelInfo.totalPrice = $scope.itinerary.travelInfo.totalTravellerPrice + $scope.itinerary.travelInfo.totalFares + $scope.itinerary.travelInfo.totalExtraPrice;
                    });
                };
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/flight/views/common/serviceRequests.html',
            controller: controller,
			scope: {
				itinerary:"="
            }
        }
    });
}());
