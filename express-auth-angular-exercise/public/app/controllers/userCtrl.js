angular.module('userCtrl', ['userService'])
// inject the User factory 
    .controller('userController', function (User) {
        var vm = this;
        vm.processing = true;
        
        //show all users on page load
        User.all().success(function (data) {
            vm.processing = false;
            vm.users = data;
        });

        vm.deleteUser = function (userId) {
            vm.processing = true;
            User.delete(userId).success(function (data) {
                //refresh
                User.all().success(function (data) {
                    vm.processing = false;
                    console.log("User.all data -> " + JSON.stringify(data) );
                    vm.users = data;
                });
            });
        }
    })

    .controller('userCreateController', function (User) {
        var vm = this;
        vm.type = 'create';

        vm.saveUser = function () {
            vm.processing = true;
            vm.message = '';

            User.create(vm.userData)
                .success(function (data) {
                    vm.processing = false;
                    vm.userData = {};
                    vm.message = data.message;
                });
        };
    })

    .controller('userEditController', function ($routeParams, User) {
        var vm = this;

        // differentiates between create or edit pages
        vm.type = 'edit';

        User.get($routeParams.user_id)
            .success(function (data) {
                vm.userData = data;
            });

        vm.saveUser = function () {
            vm.processing = true;
            vm.message = '';

            User.update($routeParams.user_id, vm.userData)
                .success(function (data) {
                    vm.processing = false;
                    vm.userData = {};
                    vm.message = data.message;
                });
        };

    })
;