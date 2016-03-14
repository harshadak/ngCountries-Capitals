// Making the data object accessible for different sections of the app

angular.module('DataServices', [])
    .factory('DataFactory', ['APIFactory', function (APIFactory) {
        var DataFactory = {};

        DataFactory.countries = APIFactory.getCountriesList();
        DataFactory.getCountry = APIFactory.getCountryDetails;
        DataFactory.getCapitals = APIFactory.getCapitals;
        DataFactory.getNeighbors = APIFactory.getNeighbors;
        return DataFactory;
    }]);
