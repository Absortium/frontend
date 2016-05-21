angular.module('MyApp')
  .controller('NavbarCtrl', function ($scope, auth, store, $location) {
    $scope.auth = auth;

    $scope.logout = function () {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $location.path('/login');
    };
  });
