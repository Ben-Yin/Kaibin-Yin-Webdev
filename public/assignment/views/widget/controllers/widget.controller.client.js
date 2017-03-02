(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);
    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.sortWidgets = sortWidgets;
        vm.getTrustHTML = getTrustHTML;
        vm.getTrustUrl = getTrustUrl;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                    console.log(vm.widgets);
                    /*
                    for (var i in vm.widgets) {
                        if (vm.widgets[i].widgetType == "HTML") {
                            vm.widgets[i].html = $sce.trustAsHtml(vm.widgets[i].text);
                        }
                        else if (vm.widgets[i].widgetType == "YOUTUBE") {
                            vm.widgets[i].trust_url = getYouTubeEmbedUrl(vm.widgets[i].url);
                        } else if (vm.widgets[i].widgetType == "IMAGE") {
                            vm.widgets[i].trust_url = $sce.trustAsResourceUrl(vm.widgets[i].url);
                        }
                    }
                    */
                })
                .error(function () {
                    vm.error = "Load widget list failed!";
                });
        }

        init();

        function getTrustHTML(widgetHTML) {
            return $sce.trustAsHtml(widgetHTML);
        }

        function getTrustUrl(WidgetUrl) {
            return $sce.trustAsResourceUrl(WidgetUrl);
        }


        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function sortWidgets(initial, final) {
            WidgetService
                .sortWidget(vm.pageId, initial, final)
                .success(function () {
                    console.log("sort success!");
                })
                .error(function () {
                    console.log("sort failed!");
                });
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

        function init() {
        }

        init();

        function createWidget(widgetType) {
            var widget = {
                "widgetType": widgetType
            };
            WidgetService
                .createWidget(vm.pageId, widget)
                .success(function (newWidget) {
                    vm.widget = newWidget;
                    vm.widgetId = newWidget._id;
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId);
                })
                .error(function () {
                    vm.error = "Create new Widget Failed!";
                })
        }

        function chooseWidgetType(widgetType) {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/new/"+widgetType);
        }

    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.getImageURL = getImageURL;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                })
                .error(function () {
                    vm.message = {
                        "type"    : "ERROR",
                        "content" : "Load widget information failed!"
                    };
                });
        }

        init();

        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget)
                .success(function (newWidget) {
                    vm.widget = newWidget;
                    vm.message = {
                        "type"    : "SUCCESS",
                        "content" : "Widget updated!"
                    };
                })
                .error(function () {
                    vm.message = {
                        "type"    : "ERROR",
                        "content" : "Update widget failed!"
                    };
                });
            // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                })
                .error(function () {
                    vm.message = {
                        "type"    : "ERROR",
                        "content" : "Delete widget failed!"
                    };

                });
        }

        function getImageURL() {
            return "/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget";
        }

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/widget-' + widgetType + '.view.client.html';
            return url;
        }
    }
})();