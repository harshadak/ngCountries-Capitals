// Testing HTTP requests

describe("APIFactory", function () {
    var getCountriesList = {};
    var getCountryDetails = {};
    var getNeighbors = {};
    var getCapitals = {};
    var $httpBackend;

    beforeEach(module("APIServices"));

    it("should fetch the Countries list", inject(function (APIFactory, $rootScope, $httpBackend) {

        $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=harshada10').respond(200);
        var status = false;
        APIFactory().then(function () {
            status = true;
        });
        $rootScope.$digest();
        $httpBackend.flush();
        expect(status).toBe(true);
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it("should fetch the Country details", inject(function (APIFactory, $rootScope, $httpBackend) {

        $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=harshada10&country=AE').respond(200);
        var status = false;
        APIFactory().then(function () {
            status = true;
        });
        $rootScope.$digest();
        $httpBackend.flush();
        expect(status).toBe(true);
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it("should fetch the neighbors of a Country", inject(function (APIFactory, $rootScope, $httpBackend) {

        $httpBackend.expect('GET', 'http://api.geonames.org/neighboursJSON?username=harshada10&country=AE').respond(200);
        var status = false;
        APIFactory().then(function () {
            status = true;
        });
        $rootScope.$digest();
        $httpBackend.flush();
        expect(status).toBe(true);
        $httpBackend.verifyNoOutstandingRequest();
    }));

    it("should fetch the Country capital", inject(function (APIFactory, $rootScope, $httpBackend) {

        $httpBackend.expect('GET', 'http://api.geonames.org/searchJSON?username=harshada10&maxRows=1&country=AE').respond(200);
        var status = false;
        APIFactory().then(function () {
            status = true;
        });
        $rootScope.$digest();
        $httpBackend.flush();
        expect(status).toBe(true);
        $httpBackend.verifyNoOutstandingRequest();
    }));
});


// Testing all the controllers

describe('controllers', function () {
    var getCountriesList = {};
    var getCountryDetails = {};
    var getNeighbors = {};
    var getCapitals = {};
    var $httpBackend;
    var controller;
    var scope;

    beforeEach(module("myApp"));

    describe('countryListCtrl', function () {
        var controller, scope;
        beforeEach(inject(function ($controller, $rootScope) {
            $scope = $rootScope.$new();
            controller = $controller('countryListCtrl', {
                $scope: scope
            });
        }));

        it('should return list of countries', function () {
            var response;

            $httpBackend.when('GET', 'http://api.geonames.org/countryInfoJSON?username=harshada10')
                .respond(200, countriesList);

            getCountriesList.search()
                .then(function (data) {
                    response = data;
                });

            $httpBackend.flush();

            expect(response).toEqual(countriesList);
        });
    });


    describe('countryDetailsCtrl', function () {
        var controller, scope;
        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            controller = $controller('countryDetailsCtrl', {
                $scope: scope
            });
        }));


        it('should return country details', function () {
            var response;

            $httpBackend.when('GET', "http://api.geonames.org/countryInfoJSON?username=harshada10&country=AE")
                .respond(200, countryDetails);

            getCountryDetails.search('AE')
                .then(function (data) {
                    response = data;
                });

            $httpBackend.flush();

            expect(response).toEqual(countryDetails);
        });

        it('should return country neighbors', function () {
            var response;

            $httpBackend.when('GET', "http://api.geonames.org/neighboursJSON?username=harshada10&country=AE")
                .respond(200, countryNeighbors);

            neighborCountries.search('AE')
                .then(function (data) {
                    response = data;
                });

            $httpBackend.flush();

            expect(response).toEqual(countryNeighbors);
        });
    });
});


// Testing the routes

describe("home route", function () {
    var $location;
    var $rootScope;
    var $httpBackend;
    var $route;
    beforeEach(module("myApp"));

    describe("/home route", function () {
        it('should load the template', function () {
            $httpBackend.whenGET('app/home.html').respond('...');

            $rootScope.$apply(function () {
                $location.path('/home');
            });

            expect($route.current.loadedTemplateUrl).toBe("app/home.html");
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        });
    });
});

describe("countries route", function () {
    var $location;
    var $rootScope;
    var $httpBackend;
    var $route;
    beforeEach(module("myApp"));

    describe("/countries route", function () {
        it('should load the template and controller', function () {
            $httpBackend.whenGET('app/country-list.html').respond('...');

            $rootScope.$apply(function () {
                $location.path('/countries');
            });
            expect($route.current.controller).toBe("countryListCtrl");
            expect($route.current.loadedTemplateUrl).toBe("app/country-list.html");
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        });
    });
});

describe("country route", function () {
    var $location;
    var $rootScope;
    var $httpBackend;
    var $route;
    beforeEach(module("myApp"));
    describe("/country route", function () {

        it('should load the template and controller', function () {
            $httpBackend.whenGET('app/country-details.html').respond('...');

            $rootScope.$apply(function () {
                $location.path('/countries/:countryCode');
            });
            expect($route.current.controller).toBe("countryDetailsCtrl");
            expect($route.current.loadedTemplateUrl).toBe("app/country-details.html");
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.verifyNoOutstandingExpectation();
        });
    });
});
