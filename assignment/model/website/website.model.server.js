module.exports = function () {
    var mongoose = require("mongoose");
    mongoose.Promise = require('bluebird');
    var WebsiteSchema = require("./website.schema.server")();
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);


    var api = {
        createWebsite : createWebsite,
        findAllWebsitesForUser : findAllWebsitesForUser,
        findWebsiteById : findWebsiteById,
        updateWebsite : updateWebsite,
        deleteWebsite : deleteWebsite,
        deleteWebsites : deleteWebsites,
        addPageForWebsite : addPageForWebsite,
        deletePageForWebsite : deletePageForWebsite
    };
    return api;

    function createWebsite(userId, website) {
        website._user = userId;
        return WebsiteModel.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        delete website._id;
        return WebsiteModel.update({_id: websiteId}, {$set: website});
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.remove({_id: websiteId});
    }

    function deleteWebsites(websiteIds) {
        return WebsiteModel
            .remove({_id:{$in:websiteIds}});
    }

    function addPageForWebsite(websiteId, page) {
        return WebsiteModel
            .findById(websiteId, function (err, website) {
                if (err) return handleError(err);
                website.pages.push(page);
                website.save();
            });
    }

    function deletePageForWebsite(websiteId, pageId) {
        return WebsiteModel
            .findById(websiteId, function (err, website) {
                if (err) return handleError(err);
                var index = website.pages.indexOf(pageId);
                website.pages.splice(index, 1);
                website.save();
            });
    }
}