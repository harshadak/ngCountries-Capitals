angular.module('myApp', ['APIServices', 'DataServices', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
                templateUrl: './home.html'
            })
            .when('/countries', {
                templateUrl: './country-list.html',
                controller: 'countryListCtrl'
            })
            .when('/countries/:countryCode', {
                templateUrl: './country-details.html',
                controller: 'countryDetailsCtrl'
            })
            .otherwise('/home', {
                templateUrl: './home.html',
            });
    }]);
