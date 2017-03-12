/// <reference path="Home/DashboardCtrl.js" />
/// <reference path="Dashboard/dashboard.html" />
(function () {
    "use strict";
    var ttuApp = angular.module("ttuApp", [
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'ngTouch',
	'oc.lazyLoad',
	'ui.bootstrap',
	'ui.router',
    'common.services'])
    .config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
        $urlRouterProvider.otherwise('/dashboard');
        $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            title: 'Dashboard',
            templateUrl: 'app-assets/Home/dashboard.html',
            controller: 'DashboardCtrl',
            resolve: {
                lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ttuApp',
                            files: [
                                'app-assets/Home/DashboardCtrl.js',
                            ]
                        }]);
                }]
            }
        })
        .state('users', {
            'abstract': true,
            title: 'Users',
            template: '<ui-view/>',
            icon: 'fa fa fa-cube'
        })
        .state('users.view', {
            url: '/users',
            title: 'Users',
            templateUrl: 'app-assets/users/users.html',
            controller: 'UsersCtrl',
            resolve: {
                lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ttuApp',
                            files: [
                                'app-assets/users/UsersCtrl.js',
                            ]
                        }]);
                }]
            }
        })
        .state('users.add', {
            url: '/users/add',
            title: 'User',
            templateUrl: 'app-assets/users/adduser.html',
            controller: 'AddUserCtrl',
            resolve: {
                lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ttuApp',
                            files: [
                                'app-assets/users/AddUserCtrl.js',
                            ]
                        }]);
                }]
            }
        })
        .state('companies', {
            'abstract': true,
            title: 'Products',
            template: '<ui-view/>',
            icon: 'fa fa fa-cube'
        })
        .state('companies.view', {
            url: '/companies',
            title: 'Companies',
            templateUrl: 'app-assets/company/company.html',
            controller: 'CompanyCtrl',
            resolve: {
                lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ttuApp',
                            files: [
                                'app-assets/company/CompanyCtrl.js',
                                'app-assets/company/companyGrid.js',
                            ]
                        }]);
                }]
            }
        })
        .state('companies.add', {
            url: '/company/add',
            title: 'Add Company',
            templateUrl: 'app-assets/company/addcompany.html',
            controller: 'AddCompanyCtrl',
            resolve: {
                lazyLoad: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'ttuApp',
                            files: [
                                'app-assets/company/AddCompanyCtrl.js',
                            ]
                        }]);
                }]
            }
        })
        .state('searchflight', {
            url: '/search',
            controller: 'SearchResultCtrl',
            templateUrl: 'app-assets/flight/searchresult.html',
        })
		.state('flightdetails', {
            url: '/flightdetails',
            templateUrl: 'app-assets/flight/flightDetails.html',
        })
       
        .state('cruise', {
            url: '/cruise'
        })
        .state('help', {
            url: '/help',
            templateUrl: '/Help/Index',
        })
        .state('login', {
            url: '/login',
            controller: 'DashboardCtrl'
        })
         .state('logout', {
             url: '/logout',
             controller: 'DashboardCtrl'
         })
        .state('contact', {
            url: '/contact',
            templateUrl: '/Home/contact',
            controller: 'ContactCtrl'
        })
         
    });

}());