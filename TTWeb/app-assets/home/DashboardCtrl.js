(function () {
    var app = angular.module("ttuApp");
    app.controller('DashboardCtrl', ['$scope', '$log', 'loginService','ShareDataService', dashboardCtrl]);
    function dashboardCtrl($scope, $log, loginService, ShareDataService) {
		var searchmodel = {"arrival":new Date(), "departure":new Date(), "adult":1,"infant":0,"child":0,"cities":[],"meals":[]};
		$scope.searchmodel = $scope.searchmodel?$scope.searchmodel:searchmodel;
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		ShareDataService.setSharedData({ months: months }, 'months');
		ShareDataService.setSharedData({ days: days }, 'days');
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