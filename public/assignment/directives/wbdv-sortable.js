(function () {
    angular
        .module("WbdvDirective", [])
        .directive("wbdvSortable", wbdvSortable);


    function wbdvSortable() {

        function link(scope, element, attributes) {
            var start = -1, end = -1;
            $(element)
                .find(".sortable-widgets")
                .sortable({
                    axis: 'y',
                    start: function (event, ui) {
                        start = ui.item.index();
                    },
                    stop: function (event, ui) {
                        end = ui.item.index();
                        scope.callback({start: start, end: end});
                    }
                });
        }

        return {
            templateUrl: "views/widget/templates/widget-sortable.view.client.html",
            scope: {
                model: "=data",
                callback: "&"
            },
            link: link
        }

    }
})();