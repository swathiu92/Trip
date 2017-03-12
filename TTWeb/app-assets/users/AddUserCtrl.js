(function () {
    angular.module("ttuApp")
    .controller('AddUserCtrl', ['$scope', '$rootScope', '$http', '$timeout', '$location', addUserCtrl]);
    function addUserCtrl($scope, $rootScope, $http, $timeout, $location) {

        $scope.user = {};
        $scope.status = false;
        $scope.actionText = "Create Account";
        $scope.addUser = function (user) {
            var promise = $http.post('api/Account/Register', user);
            promise.then(function (resp) {
                $scope.status = true;
                $scope.actionText = "Created";
            },
            function (err) {
                alert(JSON.stringify(err));
            });
        }
      
    }

})();