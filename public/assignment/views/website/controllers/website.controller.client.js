(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);
    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function () {
                    vm.error = "Load website list failed!";
                });
        }

        init();
    }

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;
        vm.userId = $routeParams.uid;

        function init() {
            //load websites for landscape showing list
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }

        init();

        function createWebsite(website) {
            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    vm.error = "Create new website failed, unknown error!";
                });
        }
    }

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            //load websites for landscape showing list
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    if (website) {
                        vm.website = website;
                    }
                })
                .error(function () {
                    vm.message = {
                        "type"    : "ERROR",
                        "content" : "Load website information failed, unknown error!"
                    };
                });
        }

        init();

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .success(function (newWebsite) {
                    vm.message = {
                        "type"    : "SUCCESS",
                        "content" : "Website updated!"
                    };
                    WebsiteService
                        .findWebsitesByUser(vm.userId)
                        .success(function (websites) {
                            vm.websites = websites;
                        });
                    // $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    vm.message = {
                        "type"    : "ERROR",
                        "content" : "Update website failed, unknown error!"
                    };
                });
        }

        function deleteWebsite(website) {
            WebsiteService
                .deleteWebsite(website._user, website._id)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    vm.message = {
                        "type"    : "ERROR",
                        "content" : "Delete website failed, unknown error!"
                    };
                });
        }

    }
})();