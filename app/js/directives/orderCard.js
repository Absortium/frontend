angular.module('MyApp')
  .directive('orderCard', function () {
    return {
      restrict: 'E',
      controller: "OrdersCtrl",
      scope: {
        type: '@type',
        primary: '=',
        secondary: '='
      },
      templateUrl: './partials/order-card.html'
    };
  });
