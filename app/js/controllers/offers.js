angular.module('AbsortiumApp')
  .controller('OffersCtrl', ['$scope', 'toastr', 'OffersSrv', function ($scope, toastr, OffersSrv) {
    'use strict';

    $scope.offers = {};

    var wsuri = "ws://absortium.com:8080/ws";
    var connection = new autobahn.Connection({
      url: wsuri,
      realm: "realm1"
    });

    console.log('load');
    connection.onopen = function (session, details) {
      $scope.pair = $scope.primary + "_" + $scope.secondary;
      OffersSrv.getOffers($scope.pair.toLowerCase(), $scope.type)
        .then(function (response) {
          var offers = response.data['results'];

          for(var i in offers) {
            var offer = offers[i];
            $scope.offers[offer.price] = offer.amount;
          }

          console.log($scope.offers);
        })
        .catch(function (response) {
          toastr.error(response.data.message, response.status);
        });


      function on_update(args, offer) {
        if ($scope.type.toLowerCase() === offer.type) {
          console.log("asasdasdasdsad");
          console.log(offer);
          $scope.offers[offer.price] = offer.amount;
          console.log($scope.offers);
        }

      }


      session.subscribe($scope.pair.toLowerCase(), on_update).then(
        function (sub) {
          console.log('Subscribed to BTC_ETH updates');
        },
        function (err) {
          console.log('failed to subscribe to BTC_ETH updates', err);
        }
      );
    };

    connection.onclose = function (reason, details) {
      console.log("Connection lost: " + reason);
      if (t1) {
        clearInterval(t1);
        t1 = null;
      }
      if (t2) {
        clearInterval(t2);
        t2 = null;
      }
    };

    connection.open();

    $scope.capitalize = function (s) {
      return s && s[0].toUpperCase() + s.slice(1);
    };

    // function success(desserts) {
    //   $scope.desserts = desserts;
    // }
    //
    // $scope.getDesserts = function () {
    //   //$scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
    // };
  }]);
