angular.module('myApp')
    .controller('countryListCtrl', ['$scope', '$location', '$filter', 'DataFactory', '$q', function ($scope, $location, $filter, DataFactory, $q) {
        'use strict';

        var toString = Object.prototype.toString;

        //checking to see if API call returned any data
        $q.when(DataFactory.countries).then(function (result) {
            //checking to see if promise returns an object result
            if (toString.call(DataFactory.countries) == '[object Object]') {
                DataFactory.countries = result.geonames;
            }
            $scope.countries = DataFactory.countries;
        });

        $scope.showDetail = function (country) {
            $location.path('/countries/' + country.countryCode);
        };


        $scope.predicate = 'countryName'; // Could be temporary

        angular.forEach($scope.countries, function (country) {
            country.areaInSqKm = parseFloat(country.areaInSqKm);
            country.population = parseFloat(country.population);
        });


        $scope.startsWith = function (actual, expected) {
            var lowerStr = (actual + "").toLowerCase();
            return lowerStr.indexOf(expected.toLowerCase()) === 0;
        };
    }])
    .controller('countryDetailsCtrl', ['$scope', '$route', 'DataFactory', function ($scope, $route, DataFactory) {
        DataFactory.getCountry($route.current.params.countryCode).then(function (result) {
            $scope.country = result[0];
            console.log($scope.country);
        });

        DataFactory.getCapitals($route.current.params.countryCode).then(function (result) {
            $scope.capital = result;
            $scope.capitalPopulation = $scope.capital.population;
        });

        DataFactory.getNeighbors($route.current.params.countryCode).then(function (result) {
            $scope.neighbors = result.geonames;
        });

        $scope.flag = $route.current.params.countryCode.toLowerCase();
        $scope.map = $route.current.params.countryCode;
    }]);
