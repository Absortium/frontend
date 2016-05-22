angular.module('AbsortiumApp')
  .factory('AccountSrv', function ($http) {
    return {
      getAccounts: function () {
        return $http.get('/api/accounts/');
      },
      createAccount: function (currency) {
        var data = {
          'currency': currency
        };

        return $http.post('/api/accounts/', data);
      }
    };
  });
