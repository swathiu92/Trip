(function () {
    "use strict";
    var mock = angular.module("usersResourceMock", ['ngMockE2E']);
    mock.run(function ($httpBackend) {

        
        var items = [{
            Name: 1,
            Email: "test",
            Contact: "9880041257",
            Roles: "Admin",

        }]

      
        var url = '\/api\/users(.*)';
        $httpBackend.when('GET', new RegExp(url)).passThrough();
      
        var url = 'api/Account(.*)';
        $httpBackend.when('POST', new RegExp(url)).passThrough();

        $httpBackend.whenGET(/^\assets\//).passThrough();
        $httpBackend.whenPOST('\/TOKEN').passThrough();
    });


}());