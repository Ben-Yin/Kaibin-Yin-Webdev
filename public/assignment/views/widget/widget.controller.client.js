(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)
    function WidgetListController($routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams["pid"];
        function init() {
            vm.websites = WidgetService.findWidgetsByPageId(vm.pageId);
        }

        init();
    }

    function NewWidgetController() {
        var vm = this;
    }

    function EditWidgetController($routeParams, WidgetService) {
        var vm = this;
        vm.widgetId = $routeParams[wgid];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        init();

        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget);
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
        }

    }
})();