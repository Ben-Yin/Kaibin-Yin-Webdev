(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;
        function login(user) {
            user = UserService.findUserByCredentials(user.username, user.password);
            if (user) {
                $location.url("/user/" + user._id);
            } else {
                vm.alert = "Unable to login";
            }
        }
    }
    function RegisterController() {
        var vm = this;
    }
    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams["userId"];
        function init() {
            vm.user = UserService.findWebsiteById(vm.userId);
        }
        init();
    }
})();