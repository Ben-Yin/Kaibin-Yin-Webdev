(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, $window, UserService) {
        var vm = this;
        vm.login = login;
        vm.changeShowPassword = changeShowPassword;

        function init() {
            vm.passwordInput = {
                "show"       : false,
                "type"      : "password",
                "glyphicons" : "glyphicon glyphicon-eye-open"
            }
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

        function changeShowPassword() {
            if (vm.passwordInput.show) {
                vm.passwordInput = {
                    "show"       : false,
                    "type"      : "password",
                    "glyphicons" : "glyphicon glyphicon-eye-open"
                }
            } else {
                vm.passwordInput = {
                    "show"       : true,
                    "type"      : "text",
                    "glyphicons" : "glyphicon glyphicon-eye-close"
                }
            }
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

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        vm.updateProfile = updateProfile;
        vm.deleteUser = deleteUser;
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

        function deleteUser(user) {
            var answer = confirm("Are you sure?");
            console.log(answer);
            if(answer) {
                UserService
                    .deleteUser(user._id)
                    .success(function () {
                        console.log("Delete user!");
                        $location.url("/login");
                    })
                    .error(function () {
                        $window.alert('unable to remove user');
                    });
            }

        }
    }
})();