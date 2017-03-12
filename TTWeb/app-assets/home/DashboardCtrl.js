(function () {
    var app = angular.module("ttuApp");
    app.controller('DashboardCtrl', ['$scope', '$log', 'loginService', dashboardCtrl]);
    function dashboardCtrl($scope, $log, loginService) {
        $scope.loginUser = function (user) {
            var userLogin = {
                username: user.email,
                password: user.password
            };
            loginService.login(userLogin)
                .then(function (resp) {
                    $scope.isLoggedIn = true;
                    jQuery('.style-switcher').hide();
                }, function (data) {
                    $log.error('Login failed:', JSON.stringify(data));
                });
        };

        $scope.closeDialog = function () {
            jQuery('.style-switcher').hide();
        }

        $scope.login = function () {
            $log.info(jQuery('.style-switcher'));
            jQuery('.style-switcher').show();
        };
        $scope.logout = function () {
            var promise = loginService.logout();
            promise.then(function (resp) {
                $scope.isLoggedIn = false;
            },
           function (err) {
               $log.error('Logout failed:', JSON.stringify(err));
           });
        };

        $scope.isLoggedIn = loginService.isLoggedIn();
    }
})();