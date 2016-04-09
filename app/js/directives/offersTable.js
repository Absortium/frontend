angular.module('MyApp')
  .directive('offersTable', function () {
    return {
      restrict: 'E',
      controller: "OffersCtrl",
      scope: {
        type: '@type',
        name: '@name',
        primary: '=',
        secondary: '='
      },
      templateUrl: './partials/offers-table.html'
    };
  });
