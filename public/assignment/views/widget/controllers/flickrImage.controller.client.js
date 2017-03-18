/**
 * Created by BenYin on 3/15/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($sce, $routeParams, FlickrService, WidgetService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        vm.getPhotoUrl = getPhotoUrl;
        vm.selectPhoto = selectPhoto;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                })
                .error(function () {
                    vm.message = {
                        "type": "ERROR",
                        "content": "Load widget information failed!"
                    };
                });
        }
        init();

        function searchPhotos(searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .success(function (res) {
                    // data = res.replace("jsonFlickrApi(","");
                    // data = data.substring(0,data.length - 1);
                    // data = JSON.parse(data);
                    vm.photos = res.photos;
                });
        }

        function getPhotoUrl(photo) {
            var farm = parseInt(photo.farm);
            var server = parseInt(photo.server);
            var id = parseInt(photo.id);
            var secret = photo.secret;
            var url = "https://farm"+farm+".staticflickr.com/"+server+"/"+id+"_"+secret+"_s.jpg";
            photo.url = url;
            return $sce.trustAsResourceUrl(url);
        }

        function selectPhoto(photo) {
            vm.widget.url = photo.url;
            WidgetService
                .updateWidget(vm.widgetId, vm.widget)
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
        }
    }
})();