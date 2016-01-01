angular.module('userApp', [
    'ngAnimate',
    'app.routes',
    'authService',
    'mainCtrl',
    'userCtrl',
    'userService'
])

.config(function($httpProvider) {
  // attach the auth interceptor to all http requests
  $httpProvider.interceptors.push('AuthInterceptor');
});