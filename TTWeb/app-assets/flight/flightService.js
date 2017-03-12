(function () {
    var app = angular.module("ttuApp");
    app.factory('flightService', ["$http", "$q", "$log", flightService]);

    function flightService($http, $q, $log) {
        var service = {
            mode: 1
        };

        return service;
    };
})();