(function () {
    "use strict";
    angular
    .module("ttuApp")
    .factory("companyService", ["$http", "$q", "$log","loginService", companyService]);

    function companyService($http, $q, $log, loginService) {
        var headers = {};
        //if (that.tokenInfo.accessToken) {
        //    headers.Authorization = 'Bearer ' + that.tokenInfo.accessToken;
        //}
        var addNew = function (company) {
            var deferred = $q.defer();
            $http({
                url: "api/companies",
                method: "POST",
                data: company,
            }).then(function (resp) {
                $log.info(resp);
                return deferred.resolve(resp.data);
            }, function (resp) {
                $log.error(resp);
                return deferred.reject(resp.status);
            });
            return deferred.promise;
        };

        var getCompanies = function () {
            var deferred = $q.defer();
            $http({
                url: "api/companies/search?userId=" + loginService.getLoggedinUser(),
                method: "GET",
            }).then(function (resp) {
                $log.info(resp);
                return deferred.resolve(resp.data);
            }, function (resp) {
                $log.error(resp);
                return deferred.reject(resp.status);
            });

            return deferred.promise;
        }

        return {
            add: addNew,
            get: getCompanies
        };
    }
}());