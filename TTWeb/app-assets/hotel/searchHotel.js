(function () {
    "use strict";
    angular.module("common.services")
    .directive('searchHotel', function () {
        var controller = ['$scope', '$log', function ($scope, $log) {
            $scope.checkIn = "Check in";
            $scope.checkOut = "Check out";
            $scope.nights = [];
            for (var i = 1; i <= 30; i++)
                $scope.nights.push(i);
            $scope.roomCount = 1;
            function child() {
                this.age = 1
            }

            function room() {
                this.number = '',
                this.adults = 1,
                this.children = new Array()
            }
            $scope.rooms = new Array();

            $scope.addRoom = function () {
                if ($scope.roomCount >= 5)
                    return;

                $scope.rooms.push(new room());

                $scope.roomCount += 1;
            };
            $scope.removeRemove = function (city) {
                $log.info($scope.citiCount);
                if ($scope.citiCount < 1)
                    return;
                //show remove button of previous city
                var index = $scope.citiCount - 3;//array is zero based, 1st item is statically added, cann't be removed
                if (!angular.isUndefined($scope.cities[index]))
                    $scope.cities[index].showRemove = true;
                $scope.cities.splice($scope.cities.indexOf(city), 1);
                $scope.citiCount -= 1;
            };
        }];

        return {
            restrict: 'E',
            templateUrl: 'app-assets/hotel/searchHotel.html',
            controller: controller,
        }
    });
}());
