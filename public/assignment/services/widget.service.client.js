(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService($http) {
        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "sortWidget": sortWidget,
            "getSignedRequest": getSignedRequest
        };

        return api;

        function createWidget(pageId, widget) {
            return $http.post("/api/page/"+pageId+"/widget", widget);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put("/api/widget/"+widgetId, widget);
        }

        function deleteWidget(pageId, widgetId) {
            return $http.delete("/api/page/"+pageId+"/widget/"+widgetId);
        }

        function sortWidget(pageId, initial, final) {
            return $http.put("/api/page/"+pageId+"/widget?initial="+initial+"&final="+final);
        }

        function getSignedRequest(widget, file) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', "/api/sign-s3?fileName=" + file.name + "&fileType=" + file.type);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                        return uploadFile(widget, file, response.signedRequest, response.url);
                    }
                    else {
                        alert('Could not get signed URL.');
                    }
                }
            };
            xhr.send();
            return $http.get("");
        }

        function uploadFile(widget, file, signedRequest, url) {
            const xhr = new XMLHttpRequest();
            var status = 0;
            xhr.open('PUT', signedRequest);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status == 200) {
                        status = xhr.status;
                        widget.url = url;
                        widget.fileName = file.name;
                        updateWidget(widget._id, widget);
                    }
                    else {
                        alert('Could not upload file.');
                    }
                }
            };
            return xhr.send(file);
        }
    }
})();