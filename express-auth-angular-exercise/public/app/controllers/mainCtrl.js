angular.module('mainCtrl', [])
    .controller('mainController', function ($rootScope, $location, Auth) {
        var vm = this;

        vm.loggedIn = Auth.isLoggedIn();
        
        // check to see if a user is logged in on every request like filter middleware
        $rootScope.$on('$routeChangeStart', function () {
            Auth.getUser().then(function (data) {
                console.log("Auth.getUser data -> " + JSON.stringify(data));
                vm.user = data.data;
            });
        });

        vm.doLogin = function () {
            vm.processing = true;

            vm.error = '';

            Auth.login(vm.loginData.username, vm.loginData.password)
                .success(function (data) {
                    vm.processing = false;

                    if (data.success) $location.path('/users');
                    else vm.error = data.message;
                });
        }

        vm.doLogout = function () {
            Auth.logout();
            vm.user = {};
            $location.path('/login');
        }

    })
;