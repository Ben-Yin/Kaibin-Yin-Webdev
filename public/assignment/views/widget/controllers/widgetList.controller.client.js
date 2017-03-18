/**
 * Created by BenYin on 3/15/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.sortWidgets = sortWidgets;
        vm.getTrustHTML = getTrustHTML;
        vm.getTrustUrl = getTrustUrl;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

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
})();