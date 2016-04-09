angular.module('MyApp')
  .controller('OrdersCtrl', ['$scope', 'OrdersSrv', 'toastr', '$auth', function ($scope, OrdersSrv, toastr, $auth) {
    'use strict';
    $scope.order = {};

    $scope.createOrder = function () {
      // console.log($auth.getToken());
      // console.log($auth.isAuthenticated());
      // console.log($auth.isAuthenticated());
      // console.log($auth.getPayload());

      var data = {
        type: $scope.type,
        price: $scope.order.price,
        amount: $scope.order.amount,
        total: $scope.order.total,
        pair: $scope.primary + "_" + $scope.secondary
      };

      OrdersSrv.createOrder(data)
        .then(function (response) {
          toastr.success('You have successfully created the new order');
          $scope.order = {};

          $scope.form.$setPristine();
          $scope.form.$setUntouched();
        })
        .catch(function (response) {
          toastr.error(response.data.message, response.status);
        });
    };
  }]);
