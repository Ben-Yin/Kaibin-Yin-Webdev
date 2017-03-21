module.exports = function () {

    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var WidgetSchema = require('./widget.schema.server')();
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        reorderWidget: reorderWidget,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        deleteWidgets: deleteWidgets
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        widget.size = 1;
        widget.width = "100%";
        return WidgetModel
            .find({_page: pageId})
            .then(function (widgets) {
                // starts with 0 and ....
                widget.index = widgets.length;
                return WidgetModel.create(widget);
            });
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function reorderWidget(pageId, start, end) {
        var start = parseInt(start);
        var end = parseInt(end);
        return WidgetModel
            .find({_page: pageId}, function (err, widgets) {
                if (start < end) {
                    moveUpWidget(widgets, start, end);
                } else if (start > end) {
                    moveDownWidget(widgets, start, end);
                }
            });
    }

    function updateWidget(widgetId, widget) {
        delete widget._id;
        return WidgetModel.update({_id: widgetId}, {$set: widget});
    }

    function deleteWidget(widgetId) {
        return WidgetModel
            .findOne({_id: widgetId})
            .then(
                function (widget) {
                    return WidgetModel
                        .find({_page: widget._page},
                            function (err, widgets) {
                                moveUpWidget(widgets, widget.index, widgets.length);
                                widget.remove();
                            });
                }
            );
    }

    function deleteWidgets(widgetIds) {
        return WidgetModel
            .remove({_id:{$in:widgetIds}});
    }

    function moveUpWidget(widgets, i, j) {
        for (var w in widgets) {
            if (widgets[w].index > i && widgets[w].index <= j) {
                widgets[w].index -= 1;
                widgets[w].save();
            }
            else if (widgets[w].index == i) {
                widgets[w].index = parseInt(j);
                widgets[w].save();
            }
        }
    }

    function moveDownWidget(widgets, i, j) {
        for (var w in widgets) {
            if (widgets[w].index < i && widgets[w].index >= j) {
                widgets[w].index += 1;
                widgets[w].save();
            }
            else if (widgets[w].index == i) {
                widgets[w].index = parseInt(j);
                widgets[w].save();
            }
        }
    }
};