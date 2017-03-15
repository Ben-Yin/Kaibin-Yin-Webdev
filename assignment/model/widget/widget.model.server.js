module.exports = function () {

    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var WidgetSchema = require('./widget.schema.server')();
    var Widget = mongoose.model('WidgetModel', WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        reorderWidget: reorderWidget,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        widget.size = 1;
        widget.width = "100%";
        return Widget
            .find({_page: pageId})
            .then(function (widgets) {
                // starts with 0 and ....
                widget.index = widgets.length;
                return Widget.create(widget);
            });
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function reorderWidget(pageId, start, end) {
        var start = parseInt(start);
        var end = parseInt(end);
        return Widget
            .find({_page: pageId}, function (err, widgets) {
                if (start < end) {
                    moveUpWidget(pageId, widgets, start, end);
                }
                else if (start > end) {
                    moveDownWidget(pageId, widgets, start, end);
                }
            });
    }

    function updateWidget(widgetId, widget) {
        delete widget._id;
        return Widget.update({_id: widgetId}, {$set: widget});
    }

    function deleteWidget(widgetId) {
        return Widget
            .findOne({_id: widgetId},
                function (err, widget) {
                    var index = widget.index;
                    var pageId = widget._page;
                    Widget
                        .find({_page: pageId},
                            function (err, widgets) {
                                widgets.forEach(function (widget) {
                                    if (widget.index > index) {
                                        widget.index--;
                                        widget.save(function() {});
                                    } else if (widget.index === index) {
                                        widget.remove();
                                    }
                                })
                            });
                });
    }

    function moveUpWidget(pageId, widgets, i, j) {
        for (var w in widgets) {
            if (widgets[w].pageId == pageId) {
                if (widgets[w].index > i && widgets[w].index <= j) {
                    widgets[w].index -= 1;
                    widget.save(function() {});
                }
                else if (widgets[w].index == i) {
                    widgets[w].index = parseInt(j);
                    widget.save(function() {});
                }
            }

        }
    }

    function moveDownWidget(pageId, widgets, i, j) {
        for (var w in widgets) {
            if (widgets[w].pageId == pageId) {
                if (widgets[w].index < i && widgets[w].index >= j) {
                    widgets[w].index += 1;
                    widget.save(function() {});
                }
                else if (widgets[w].index == i) {
                    widgets[w].index = parseInt(j);
                    widget.save(function() {});
                }
            }

        }
    }
};