(function () {
    angular.module("ttuApp")
    .controller('CompanyCtrl', ['$scope', '$state', companyCtrl]);
    function companyCtrl($scope, $state) {
        $scope.addCompany = function () {
            $state.go('companies.add');
        }
        $scope.addProduct = function (company) {
            $state.go('products.add', company);
        }
    }

})();