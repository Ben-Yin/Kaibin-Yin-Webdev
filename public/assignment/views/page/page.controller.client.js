(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("NewPageController", NewPageController)
        .controller("EditPageController", EditPageController)
    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams["websiteId"]
        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }
    function NewPageController() {
        var vm = this;
    }
    function EditPageController($routeProvider, PageService) {
        var vm = this;
        vm.pageId = $routeProvider.pageId;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.page = PageService.findPageById(vm.pageId);
        }
        function updatePage(page) {
            PageService.updatePage(vm.pageId, page);
        }
        function deletePage() {
            PageService.deletePage(vm.pageId);
        }
        init();
    }
})();