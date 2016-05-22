angular.module('AbsortiumApp')
  .controller('OrdersCtrl', ['$scope', 'OrdersSrv', 'toastr', function ($scope, OrdersSrv, toastr) {
    'use strict';
    $scope.order = {};

    $scope.createOrder = function () {
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
