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
            var promise = UserService.findUserByCredentials();
            promise.success(function () {
                
            })
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
                $window.alert("two input password is not the same, Please check!");
            } else {
                var newUser = {_id:"", username:"", password:""};
                newUser.username = user.username;
                newUser.password = user.password;
                newUser = UserService.createUser(newUser);
                if (newUser) {
                    $location.url("/user/"+newUser._id);
                }
            }
        }
    }

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateProfile = updateProfile;
        vm.userId = $routeParams["uid"];
        function init() {
            var promise = UserService.findUserById(vm.userId);
            promise.success(function (user) {
                vm.user = user;
            })
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