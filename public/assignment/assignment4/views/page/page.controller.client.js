(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController);
    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }

        init();
    }

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.createPage = createPage;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        function init() {
            //load pages for landscape showing list
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }

        init();

        function createPage(page) {
            PageService.createPage(vm.websiteId, page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }
    }

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];

        function init() {
            //load pages for landscape showing list
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }

        init();

        function updatePage(page) {
            PageService.updatePage(vm.pageId, page);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

    }
})();