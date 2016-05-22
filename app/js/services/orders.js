angular.module('AbsortiumApp')
  .factory('OrdersSrv', function($http) {
    return {
      createOrder: function(data) {
        return $http.post('/api/orders/', data);
      }
    };
  });
