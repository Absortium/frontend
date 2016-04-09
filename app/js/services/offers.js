angular.module('MyApp')
  .factory('OffersSrv', function($http) {
    return {
      getOffers: function(pair, type) {
        return $http.get('/api/offers/' + pair + "/" + type);
      }
    };
  });
