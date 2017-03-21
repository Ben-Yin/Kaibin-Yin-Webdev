(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);
    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function () {
                    vm.error = "Load page list failed!";
                })
        }

        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.createPage = createPage;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            //load pages for landscape showing list
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }

        init();

        function createPage(page) {
            PageService
                .createPage(vm.websiteId, page)
                .success(function (page) {
                    vm.page = page;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                });
        }
    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        function init() {
            //load pages for landscape showing list
            PageService
                .findPageByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                })
                .error(function () {
                    vm.message = {
                        "type"    : "ERROR",
                        "content" : "Load page information failed, unknown error!"
                    };
                });
        }

        init();

        function updatePage(page) {
            PageService
                .updatePage(vm.pageId, page)
                .success(function (newPage) {
                    vm.message = {
                        "type"    : "SUCCESS",
                        "content" : "Page updated!"
                    };
                    PageService
                        .findPageByWebsiteId(vm.websiteId)
                        .success(function (pages) {
                            vm.pages = pages;
                        });
                })
                .error(function () {
                    vm.message = {
                        "type"    : "ERROR",
                        "content" : "Update page failed, unknown error!"
                    };
                });
            // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function deletePage() {
            PageService
                .deletePage(vm.websiteId, vm.pageId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function () {
                    vm.message = {
                        "type"    : "ERROR",
                        "content" : "Delete page failed, unknown error!"
                    };
                });
            // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

    }
})();