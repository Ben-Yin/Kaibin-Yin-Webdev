/**
 * Created by BenYin on 2/15/17.
 */
module.exports = function (app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsites);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
    ];

    function findAllWebsites(req, res) {
        var userId = req.params.userId;
        var sites = [];
        for (var i in websites) {
            if (userId == websites[i].developerId) {
                sites.push(websites[i]);
            }
        }
        res.json(sites);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var website = websites.find(function (w) {
            return w._id == websiteId;
        });
        res.json(website);
    }
    
    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        for (var i in websites) {
            if (websites[i]._id == websiteId) {
                websites[i].name = newWebsite.name;
                websites[i].developerId = newWebsite.developerId;
                websites[i].description = newWebsite.description;
                websites[i].update = new Date();
                res.json(websites[i]);
            }
        }
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var newWebsite = req.body;
        newWebsite._id = parseInt(websites[websites.length - 1]._id) + 1;
        newWebsite.developerId = userId;
        newWebsite.update = new Date();
        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for (var i in websites) {
            if (websites[i]._id == websiteId) {
                websites.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};