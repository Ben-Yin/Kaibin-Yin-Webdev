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
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
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
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function sortWidgets(initial, final) {
            WidgetService
                .sortWidget(vm.pageId, initial, final)
                .success(function () {
                    vm.message = "sort success!";
                })
                .error(function () {
                    vm.message = "sort failed!";
                });
        }

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/templates/list/widget-list-' + widgetType + '.view.client.html';
            return url;
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
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId);
                })
                .error(function () {
                    vm.error = "Create new Widget Failed!";
                })
        }

        function chooseWidgetType(widgetType) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new/" + widgetType);
        }

    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.requestUploadFile = requestUploadFile;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId = $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                    vm.uploadFile = null;
                    vm.responseStatus = 0;
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
                .success(function (newWidget) {
                    vm.widget = newWidget;
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
                .deleteWidget(vm.widgetId)
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
            getSignedRequest(file);
        }

        function getSignedRequest(file) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', "/api/sign-s3?fileName=" + file.name + "&fileType=" + file.type);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        uploadFile(file, response.signedRequest, response.url);
                    }
                    else {
                        alert('Could not get signed URL.');
                    }
                }
            };
            xhr.send();
        }

        function uploadFile(file, signedRequest, url) {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', signedRequest);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        vm.responseStatus = xhr.status;
                        vm.widget.url = url;
                        WidgetService
                            .updateWidget(vm.widgetId, vm.widget)
                            .success(function (newWidget) {
                                vm.widget = newWidget;
                                vm.message = {
                                    "type": "SUCCESS",
                                    "content": "Image Uploaded successful!"
                                };
                            })

                    }
                    else {
                        alert('Could not upload file.');
                    }
                }
            };
            xhr.send(file);
        }
    }
})();