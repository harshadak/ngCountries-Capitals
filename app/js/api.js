// Making API calls to gather info for different sections of the app

angular.module('APIServices', [])
    .factory('APIFactory', ['$http', '$route', '$q', function ($http, $route, $q) {
        var username = "harshada10";
        var urlBase = "http://api.geonames.org/";

        return {
            getCountriesList: function () {
                var defer = $q.defer();
                var url = urlBase + "countryInfoJSON";
                var request = {
                    callback: 'JSON_CALLBACK',
                    username: username
                };

                $http.get({
                    method: 'JSONP',
                    url: url,
                    params: request,
                    cache: true
                })

                .success(function (data, status, headers, config) {
                    console.log(data);
                    if (typeof data.status == 'object') {
                        console.log("Error'" + data.status.message + "'");
                        defer.reject(data.status);
                    } else {
                        defer.resolve(data);
                    }
                })

                .error(function (data, status, headers, config) {
                    console.log(status + " error attempting to access geonames.org.");
                    defer.reject();
                });
                return defer.promise;
            },

            getCountryDetails: function (countryCode) {
                var defer = $q.defer();
                var url = urlBase + "countryInfoJSON";
                var request = {
                    callback: 'JSON_CALLBACK',
                    country: countryCode,
                    username: username
                };

                $http.get({
                    method: 'JSONP',
                    url: url,
                    params: request,
                    cache: true
                })

                .success(function (data, status, headers, config) {
                    console.log(data);
                    defer.resolve(data.geonames);
                })

                .error(function (data, status, headers, config) {
                    console.log(status + " error attempting to get country from geonames.org.");
                    defer.reject();
                });
                return defer.promise;
            },

            getNeighbors: function (countryCode) {
                var defer = $q.defer();
                var url = urlBase + "neighboursJSON";
                var request = {
                    callback: 'JSON_CALLBACK',
                    country: countryCode,
                    username: username
                };

                $http.get({
                    method: 'JSONP',
                    url: url,
                    params: request,
                    cache: true
                })

                .success(function (data, status, headers, config) {
                    console.log(data);
                    defer.resolve(data);
                })

                .error(function (data, status, headers, config) {
                    console.log(status + " error attempting to access geonames.org.");
                    defer.reject();
                });
                return defer.promise;
            },

            getCapitals: function (countryCode) {
                var defer = $q.defer();
                var url = urlBase + "searchJSON";
                var request = {
                    callback: 'JSON_CALLBACK',
                    q: "capital",
                    country: countryCode,
                    maxRows: 1,
                    username: username
                };

                $http.get({
                    method: 'JSONP',
                    url: url,
                    params: request,
                    cache: true
                })

                .success(function (data, status, headers, config) {
                    console.log(data);
                    defer.resolve(data.geonames[0]);
                })

                .error(function (data, status, headers, config) {
                    console.log(status + " error attempting to get country from geonames.org.");
                    defer.reject();
                });
                return defer.promise;
            },
        };
    }]);
