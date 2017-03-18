(function () {
    var app = angular.module("ttuApp");
    app.controller('SearchResultCtrl', ['$scope', 'flightService', '$log', searchResultCtrl]);

    function searchResultCtrl($scope, flightService, $log) {
		$scope.searchDataModel = {};
		
        $scope.flight = flightService;
        $log.info($scope.flight.mode);
    }
})();