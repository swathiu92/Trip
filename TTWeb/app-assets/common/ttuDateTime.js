(function () {
    "use strict";
    angular.module("common.services")
    .directive('ttuDateTime', function () {

        var controller = ['$scope', '$log', function ($scope, $log) {
            $scope.onEnter = function (keyEvent) {
                if (keyEvent.which === 13)
                    $scope.open();
            }
            //$log.info($scope);
            $scope.today = function () {
                $scope.itinerary = ($scope.itinerary)?$scope.itinerary:new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.itinerary = null;
            };

            $scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2080, 12, 31),
                minDate: new Date(),
                startingDay: 1
            };

            $scope.toggleMin = function () {
                $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
                $scope.dateOptions.minDate = new Date();
            };

            $scope.toggleMin();

            $scope.open = function () {
                $scope.popup.opened = true;
            };


            $scope.setDate = function (year, month, day) {
                $scope.product.registrationDate = new Date(year, month, day);
            };

            $scope.formats = ['dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
            $scope.altInputFormats = ['d!/M!/yyyy'];

            $scope.popup = {
                opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            $scope.events = [
              {
                  date: tomorrow,
                  status: 'full'
              },
              {
                  date: afterTomorrow,
                  status: 'partially'
              }
            ];

            function getDayClass(data) {
                var date = data.date,
                  mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                    for (var i = 0; i < $scope.events.length; i++) {
                        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                        if (dayToCheck === currentDay) {
                            return $scope.events[i].status;
                        }
                    }
                }

                return '';
            }
        }];

        return {
            restrict: 'E',
            scope: {
                displayText: "=",
                itinerary: "=?itinerary"
            },
            templateUrl: 'app-assets/common/ttuDateTime.html',
            controller: controller,
        }
    });
}());