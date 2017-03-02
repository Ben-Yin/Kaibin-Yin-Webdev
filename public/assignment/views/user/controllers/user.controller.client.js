(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, $window, UserService) {
        var vm = this;
        vm.login = login;

        function init() {
        }

        init();

        function login(user) {
            UserService
                .findUserByCredentials(user.username, user.password)
                .success(function (user) {
                    if (user) {
                        $location.url("/user/"+user._id);
                    } else {
                        vm.error = "Incorrect username or password!";
                    }
                });
        }
    }

    function RegisterController($location, $window, UserService) {
        var vm = this;
        vm.register = register;

        function init() {
        }

        init();

        function register(user) {
            if (user.password != user.passwordAgain) {
                vm.error = "The input password do not match!";
                return;
            }
            UserService
                .findUserByUsername(user.username)
                .success(function (user) {
                    vm.error = "The username exists!"
                })
                .error(function () {
                    UserService
                        .createUser(user)
                        .success(function (user) {
                            $location.url("/user/"+user._id);
                        })
                        .error(function () {
                            vm.error = "Register failed, unknown error!";
                        });
                });
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateProfile = updateProfile;
        vm.userId = $routeParams.uid;

        function init() {
            UserService
                .findUserById(vm.userId)
                .success(function (user) {
                    vm.user = user;
                });
        }

        init();

        function updateProfile(user) {
            var newUser = UserService.updateUser(vm.userId, user);
            console.log(newUser);
            if (newUser) {
                vm.message = {type: "SUCCESS", content:"Profile updated!"};
                init();
            } else {
                vm.message = {type: "ERROR", content:"Update profile failed!"};
            }
        }
    }
})();