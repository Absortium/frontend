angular.module('MyApp', [
  'ngResource',
  'ngMessages',
  'ngAnimate',
  'toastr',
  'ui.router',
  'satellizer',
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
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html',
        controller: 'SignupCtrl',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('logout', {
        url: '/logout',
        template: null,
        controller: 'LogoutCtrl'
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
      clientID: 'AsRV3YgqX7qQNYqsITCLGM05C85ypkpd',
      loginUrl: '/login'
    });

    //Called when login is successful
    authProvider.on('loginSuccess', function ($location, profilePromise, idToken, store) {
      console.log("Login Success");
      profilePromise.then(function (profile) {
        store.set('profile', profile);
        store.set('token', idToken);
      });
      $location.path('/');
    });

    //Called when login fails
    authProvider.on('loginFailure', function () {
      console.log("Error logging in");
      $location.path('/login');
    });

    //Angular HTTP Interceptor function
    jwtInterceptorProvider.tokenGetter = function (store) {
      return store.get('token');
    };

    //Push interceptor function to $httpProvider's interceptors
    $httpProvider.interceptors.push('jwtInterceptor');

    // $authProvider.tokenPrefix = "";
    // $authProvider.authToken = "JWT";
    //
    // $authProvider.google({
    //   url: '/auth/social/oauth2/google',
    //   clientId: '627422708179-p2nsu6pq24iatk3pccjdcj9gkq8lr1lj.apps.googleusercontent.com',
    //   responseParams: {
    //     code: 'code',
    //     clientId: 'client_id',
    //     redirectUri: 'redirect_uri'
    //   }
    // });
    //
    // $authProvider.github({
    //   url: '/auth/social/oauth2/github',
    //   clientId: '87ca9a8ddc43578f62e5',
    //   responseParams: {
    //     code: 'code',
    //     clientId: 'client_id',
    //     redirectUri: 'redirect_uri'
    //   }
    // });
    //
    //
    // $authProvider.twitter({
    //   url: '/auth/social/oauth1/twitter',
    //   responseParams: {
    //     code: 'code',
    //     clientId: 'client_id',
    //     redirectUri: 'redirect_uri'
    //   }
    // });

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }
  })

  .run(function (auth) {
    // This hooks all auth events to check everything as soon as the app starts
    auth.hookEvents();
  });
