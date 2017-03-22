/**
 * Created by BenYin on 3/15/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.requestUploadFile = requestUploadFile;
        vm.searchFromFlickr = searchFromFlickr;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                    vm.uploadFile = null;
                })
                .error(function () {
                    vm.message = {
                        "type": "ERROR",
                        "content": "Load widget information failed!"
                    };
                });
        }

        init();

        function updateWidget(widget) {
            WidgetService.updateWidget(vm.widgetId, widget)
                .success(function (status) {
                    vm.message = {
                        "type": "SUCCESS",
                        "content": "Widget updated!"
                    };
                })
                .error(function () {
                    vm.message = {
                        "type": "ERROR",
                        "content": "Update widget failed!"
                    };
                });
            // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.pageId, vm.widgetId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                })
                .error(function () {
                    vm.message = {
                        "type": "ERROR",
                        "content": "Delete widget failed!"
                    };

                });
        }

        function getWidgetTemplateUrl(widgetType) {
            if (widgetType) {
                var url = 'views/widget/templates/editor/widget-' + widgetType + '.view.client.html';
                return url;
            }

        }

        function requestUploadFile() {
            const file = vm.uploadFile;
            if (file == null) {
                return alert('No file selected.');
            }
            WidgetService
                .getSignedRequest(vm.widget, file)
                .success(function (newWidget) {
                    vm.message = {
                        "type": "SUCCESS",
                        "content": "Image Uploaded successful!"
                    };
                });
        }

        function searchFromFlickr() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId + "/flickr");
        }
    }
})();