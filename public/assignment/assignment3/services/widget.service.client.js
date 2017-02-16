(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService() {
        var widgets = [
            {"_id": 123, "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": 234, "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": 345, "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": 456, "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": 567, "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": 678, "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://www.youtube.com/embed/AM2Ivdi9c4E"
            },
            {"_id": 789, "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            widget._id = widgets[widgets.length - 1]._id + 1;
            widget.pageId = pageId;
            widgets.push(widget);
            return angular.copy(widget);
        }

        function findWidgetsByPageId(pageId) {
            PageWidgets = [];
            for (var i in widgets) {
                if (widgets[i].pageId == pageId) {
                    PageWidgets.push(angular.copy(widgets[i]));
                }
            }
            return angular.copy(PageWidgets);
        }

        function findWidgetById(widgetId) {
            var left = 0;
            var right = widgets.length;
            while (left <= right) {
                var mid = parseInt((left + right) / 2);
                if (widgets[mid]._id == widgetId) {
                    return angular.copy(widgets[mid]);
                } else if (widgets[mid]._id > widgetId) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id == widgetId) {
                    widgets[i] = angular.copy(widget);
                    return angular.copy(widgets[i]);
                }
            }
        }

        function deleteWidget(widgetId) {
            for (var i = 0; i < widgets.length; i++) {
                if (widgets[i]._id == widgetId) {
                    widgets.splice(i, 1);
                }
            }
        }
    }
})();