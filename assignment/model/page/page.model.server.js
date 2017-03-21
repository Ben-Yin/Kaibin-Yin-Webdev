module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model("PageModel", PageSchema);
    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage,
        deletePages: deletePages,
        addWidgetForPage: addWidgetForPage,
        deleteWidgetForPage: deleteWidgetForPage
    };
    return api;

    function createPage(websiteId, page) {
        page._website = websiteId;
        return PageModel.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel
            .find({_website: websiteId});
    }

    function findPageById(pageId) {
        return PageModel
            .findById(pageId);
    }

    function updatePage(pageId, page) {
        delete page._id;
        return PageModel
            .update({_id: pageId}, {$set: page});
    }

    function deletePage(pageId) {
        return PageModel
            .remove({_id: pageId});
    }

    function deletePages(pageIds) {
        return PageModel
            .remove({_id:{$in:pageIds}});
    }

    function addWidgetForPage(pageId, widget) {
        return PageModel
            .findById(pageId, function (err, page) {
                if (err) return handleError(err);
                page.widgets.push(widget);
                page.save();
            });
    }

    function deleteWidgetForPage(pageId, widgetId) {
        return PageModel
            .findById(pageId, function (err, page) {
                if (err) return handleError(err);
                var index = page.widgets.indexOf(widgetId);
                page.widgets.splice(index, 1);
                page.save();
            });
    }

};