(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController)
    function WidgetListController($routeParams, WidgetService) {
        var vm = this;
        vm.pageId = $routeParams["pageId"];
        function init() {
            vm.websites = WidgetService.findWidgetsByPageId(vm.pageId);
        }

        init();
    }

    function NewWidgetController() {
        var vm = this;
    }

    function EditWidgetController($routeProvider, WidgetService) {
        var vm = this;
        vm.widgetId = $routeProvider.widgetId;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget);
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
        }

        init();
    }
})();