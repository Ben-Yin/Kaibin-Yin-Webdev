/**
 * Created by BenYin on 2/18/17.
 */
module.exports = function (app, model) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPages);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/website/:websiteId/page/:pageId", deletePage);

    function findAllPages(req, res) {
        var websiteId = req.params.websiteId;
        model
            .PageModel
            .findAllPagesForWebsite(websiteId)
            .then(
                function (pages) {
                    res.json(pages);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(500).send(err);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        model
            .PageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(500).send(err);
                }
            )
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        model
            .PageModel
            .updatePage(pageId, newPage)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(500).send(err);
                }
            );
    }

    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;
        model
            .PageModel
            .createPage(websiteId, newPage)
            .then(
                function (page) {
                    return model
                        .WebsiteModel
                        .addPageForWebsite(websiteId, page);
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

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        var websiteId = req.params.websiteId;
        model
            .PageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    var promises = [];
                    for (var i=0; i < page.widgets.length; i++) {
                        var promise = model
                            .WidgetModel
                            .deleteWidget(page.widgets[i]);
                        promises.push(promise);
                    }
                    promises.push(model
                        .WebsiteModel
                        .deletePageForWebsite(websiteId, pageId));
                    promises.push(page.remove());
                    return model.Promise.all(promises);
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