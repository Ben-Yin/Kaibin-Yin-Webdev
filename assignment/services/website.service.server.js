/**
 * Created by BenYin on 2/15/17.
 */
module.exports = function (app, model) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsites);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);


    function findAllWebsites(req, res) {
        var userId = req.params.userId;
        model
            .WebsiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function (websites) {
                    res.json(websites);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(404);
                }
            );
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        model
            .WebsiteModel
            .findWidgetById(websiteId)
            .then(
                function (website) {
                    res.json(website)
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(404);
                }
            );
    }

    
    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        model
            .WebsiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(
                function (website) {
                    res.json(website);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(404);
                }
            );
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var newWebsite = req.body;
        model
            .WebsiteModel
            .createWebsite(userId, newWebsite)
            .then(
                function (website) {
                    res.json(website);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(404);
                }
            );
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        model
            .WebsiteModel
            .deleteWebsite(websiteId)
            .then(
                function (website) {
                    res.sendStatus(200);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(404);
                }
            )
    }
};