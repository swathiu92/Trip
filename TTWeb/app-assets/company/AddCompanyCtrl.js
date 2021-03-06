﻿(function () {
    angular.module("ttuApp")
    .controller('AddCompanyCtrl', ['$scope', "companyService", addCompanyCtrl]);
    function addCompanyCtrl($scope, companyService) {

        $scope.company = {};
        $scope.status = false;
        $scope.actionText = "Add New Company";
        $scope.displayText = "Registration Date";
        $scope.addCompany = function (company) {
            companyService.add(company)
                .then(function (resp) {
                    $scope.status = true;
                    $scope.actionText = "Added";
                },
            function (err) {
                alert(JSON.stringify(err));
            });
        }

        $scope.onEnter = function (keyEvent) {
            if (keyEvent.which === 13)
                $scope.open();
        }

        $scope.today = function () {
            $scope.company.registrationDate = new Date();
        };
        $scope.today();

        $scope.clear = function () {
            $scope.company.registrationDate = null;
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
            $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
        };

        $scope.toggleMin();

        $scope.open = function () {
            $scope.popup.opened = true;
        };


        $scope.setDate = function (year, month, day) {
            $scope.company.registrationDate = new Date(year, month, day);
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
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
    }

})();