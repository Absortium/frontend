angular.module('AbsortiumApp')
  .controller('NavbarCtrl', function ($scope, auth, store, $location, AccountSrv) {
    $scope.auth = auth;

    AccountSrv.getAccounts().then(function (data) {
      console.log(data)
    });

    AccountSrv.createAccount('eth').then(function (data) {
      console.log(data)
    });

    $scope.signin = function () {
      auth.signin({
        authParams: {
          scope: 'openid email' // Specify the scopes you want to retrieve
        }
      }, function (profile, idToken, accessToken, state, refreshToken) {
        console.log("Success :)", err);
      }, function (err) {
        console.log("Error :(", err);
      });
    };

    $scope.logout = function () {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $location.path('/login');
    };
  })
;
