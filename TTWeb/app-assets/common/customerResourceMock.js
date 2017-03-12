(function () {
    "use strict";
    var mock = angular.module("customerResourceMock", ['ngMockE2E']);
    mock.run(function ($httpBackend) {

        
        var customers = [{
            Id: 1,
            RouteText: "test",
            ResourceKey: "3"

        }]

      
        var url = '\/api\/customer(.*)';
        $httpBackend.when('GET', new RegExp(url)).respond(customers);
      
        $httpBackend.whenGET(/^\/Home\//).passThrough();
        $httpBackend.whenGET('/customer').passThrough();
        $httpBackend.whenGET('customer/create').passThrough();
    });


}());