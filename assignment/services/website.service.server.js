/**
 * Created by BenYin on 2/15/17.
 */
module.exports = function (app, model) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsites);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);

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
                    res.sendStatus(500).send(err);
                }
            );
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        model
            .WebsiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    res.json(website)
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(500).send(err);
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
                    res.sendStatus(500).send(err);
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
                    return model
                        .UserModel
                        .addWebsiteForUser(userId, website);
                }
            )
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(500).send(err);
                }
            );
    }

    function deleteWebsite(req, res) {
        var userId = req.params.userId;
        var websiteId = req.params.websiteId;
        model
            .WebsiteModel
            .findWebsiteById(websiteId)
            .then(
                function (website) {
                    return model
                        .Promise
                        .join(
                            model
                                .PageModel
                                .deletePages(website.pages),
                            website.remove(),
                            function () {
                            }
                        );
                }
            )
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                console.log(err);
                res.sendStatus(500).send(err);
            });
    }

};