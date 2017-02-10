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
            user = UserService.findUserByCredentials(user.username, user.password);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                $window.alert("Unable to login");
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
            vm.user = UserService.findUserById(vm.userId);
            console.log(vm.user);
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