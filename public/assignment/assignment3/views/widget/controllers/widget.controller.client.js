(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);
    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            for (var i in vm.widgets) {
                if (vm.widgets[i].widgetType == "HTML") {
                    vm.widgets[i].html = $sce.trustAsHtml(vm.widgets[i].text);
                }
                else if (vm.widgets[i].widgetType == "youtube") {
                    vm.widgets[i].trust_url = getYouTubeEmbedUrl(vm.widgets[i].url);
                } else if (vm.widgets[i].widgetType == "image") {
                    vm.widgets[i].trust_url = $sce.trustAsResourceUrl(vm.widgets[i].url);
                }
            }
        }

        init();

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function NewWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.createWidget = createWidget;
        vm.chooseWidgetType = chooseWidgetType;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.widgetType = $routeParams["wgt"];

        function init() {
            vm.widget = {"widgetType" : vm.widgetType};
        }

        init();

        function createWidget(widget) {
            vm.widget = WidgetService.createWidget(vm.pageId, widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function chooseWidgetType(widgetType) {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/new/"+widgetType);
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        init();

        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function deleteWidget() {
            WidgetService.deleteWidget(vm.widgetId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

    }
})();