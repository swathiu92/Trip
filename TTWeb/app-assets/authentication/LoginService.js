(function () {
    var app = angular.module("ttuApp");
    app.service('loginService', ["$http", "$q", "$log", loginService]);

    function loginService($http, $q, $log) {
        var that = this;
        that.tokenInfo = null;

        this.init = function () {
            if (sessionStorage["TokenInfo"]) {
                that.tokenInfo = JSON.parse(sessionStorage["TokenInfo"]);
            }
        }

        this.setTokenInfo = function (userInfo) {
            that.tokenInfo = userInfo;
            sessionStorage["TokenInfo"] = JSON.stringify(userInfo);
        }

        this.getTokenInfo = function () {
            return that.tokenInfo;
        }

        this.removeToken = function () {
            that.tokenInfo = null;
            sessionStorage["TokenInfo"] = null;
        }

        this.register = function (userInfo) {
            var resp = $http({
                url: "/api/Account/Register",
                method: "POST",
                data: userInfo,
            });
            return resp;
        };

        this.isLoggedIn = function () {
            if (that.getTokenInfo()) {
                return true;
            }
            else
                return false;
        }

        this.getLoggedinUser = function () {
            var tokenInfo = that.getTokenInfo();
            if (tokenInfo) {
                return tokenInfo.userName;
            }
            else
                return "";

            $log.info("getLoggedinUser: " + angular.toJson(tokenInfo));
        }

        this.login = function (userlogin) {
            $log.info(userlogin);
            var deferred = $q.defer();
            $http({
                url: "/TOKEN",
                method: "POST",
                data: $.param({ grant_type: 'password', username: userlogin.username, password: userlogin.password }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            }).then(function (resp) {
                $log.info(resp);

                var userInfo = {
                    accessToken: resp.data.access_token,
                    userName: resp.data.userName
                };
                that.setTokenInfo(userInfo);
                return deferred.resolve(resp.data);
            }, function (resp) {
                $log.info(resp);
                return deferred.reject(resp.status);
            });
            return deferred.promise;
        };


        this.logout = function () {
            var deferred = $q.defer();
            var headers = {};
            if (that.tokenInfo.accessToken) {
                headers.Authorization = 'Bearer ' + that.tokenInfo.accessToken;
            }

            $http({
                url: "api/Account/Logout",
                method: "POST",
                headers: headers,
            }).then(function () {
                that.removeToken();
                deferred.resolve();
            },
            function (resp) {
                deferred.reject(resp);
            });
            return deferred.promise;

        };

        this.init();
    };
})();