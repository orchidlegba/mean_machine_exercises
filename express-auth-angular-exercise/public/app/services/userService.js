angular.module('userService', [])
    .factory('User', function ($http) {
        var userFactory = {};

        userFactory.all = function () {
            return $http.get('/api/users');
        };

        userFactory.get = function (userId) {
            return $http.get('/api/users/' + userId);
        };

        userFactory.create = function (userData) {
            return $http.post('/api/users/', userData);
        };

        userFactory.update = function (userId, userData) {
            return $http.put('/api/users/' + userId, userData);
        };

        userFactory.delete = function (userId) {
            return $http.delete('/api/users/' + userId);
        };

        return userFactory;
    });