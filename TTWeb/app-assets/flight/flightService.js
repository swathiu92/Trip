(function () {
    var app = angular.module("ttuApp");
    app.factory('flightService', ["$http", "$q", "$log", flightService]);

    function flightService($http, $q, $log) {
        var service = {
            mode: 1
        };
		service.getAirlines = function(){
			var deferred = $q.defer();
            $http({ method: "GET", url: "app-assets/proxy/airlines.json" })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
		};
		service.getStates = function(){
			var deferred = $q.defer();
            $http({ method: "GET", url: "app-assets/proxy/states.json" })
                .success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).error(function (data, status, headers, config) {
                    deferred.reject(status);
                });
            return deferred.promise;
		};

        return service;
    };
})();