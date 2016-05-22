angular.module('AbsortiumApp', [
  'ngResource',
  'ngMessages',
  'ngAnimate',
  'toastr',
  'ui.router',
  'ngMaterial',
  'md.data.table',
  'angular-jwt',
  'auth0',
  'angular-storage'
])
  .config(function ($stateProvider, $urlRouterProvider, authProvider, $httpProvider, $locationProvider, jwtInterceptorProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl',
        controllerAs: 'home_ctrl',
        templateUrl: 'partials/home.html'
      })

      .state('profile', {
        url: '/profile',
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl',
        resolve: {
          loginRequired: loginRequired
        }
      });

    $urlRouterProvider.otherwise('/');

    authProvider.init({
      domain: 'absortium.auth0.com',
      clientID: 'JmIrPzSo0nixk13ohk8KeQC2OZ7LByRI',
      loginUrl: '/login'
    });

    authProvider.on('loginSuccess', function ($location, profilePromise, idToken, store) {
      console.log("Login Success");
      profilePromise.then(function (profile) {
        store.set('profile', profile);
        store.set('token', idToken);
      });
      $location.path('/');
    });

    authProvider.on('loginFailure', function () {
      alert("Error");
    });

    authProvider.on('authenticated', function ($location) {
      console.log("Authenticated");

    });

    jwtInterceptorProvider.tokenGetter = function (store) {
      return store.get('token');
    };

    // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
    // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
    // want to check the delegation-token example
    $httpProvider.interceptors.push('jwtInterceptor');

    function skipIfLoggedIn($q, auth) {
      var deferred = $q.defer();
      if (auth.isAuthenticated) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, auth) {
      var deferred = $q.defer();
      if (auth.isAuthenticated) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }

  })

  .run(function ($rootScope, auth, store, jwtHelper, $location) {
    $rootScope.$on('$locationChangeStart', function () {

      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!auth.isAuthenticated) {
            auth.authenticate(store.get('profile'), token);
          }
        } else {
          // Either show the login page or use the refresh token to get a new idToken
          $location.path('/');
        }
      }

    })
  })

