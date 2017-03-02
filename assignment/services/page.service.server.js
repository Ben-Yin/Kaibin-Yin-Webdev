/**
 * Created by BenYin on 2/18/17.
 */
module.exports = function (app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPages);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", update: new Date(), "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", update: new Date(), "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", update: new Date(), "websiteId": "456", "description": "Lorem" }
    ];

    function findAllPages(req, res) {
        var websiteId = req.params.websiteId;
        var requestPages = [];
        for (var i in pages) {
            if (websiteId == pages[i].websiteId) {
                requestPages.push(pages[i]);
            }
        }
        res.json(requestPages);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        var page = pages.find(function (p) {
            return p._id == pageId;
        });
        res.json(page);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        for (var i in pages) {
            if (pages[i]._id == pageId) {
                console.log(newPage);
                pages[i].name = newPage.name;
                pages[i].websiteId = newPage.websiteId;
                pages[i].description = newPage.description;
                pages[i].update = new Date();
                res.json(pages[i]);
            }
        }
    }

    function createPage(req, res) {
        var newPage = req.body;
        var websiteId = req.params.websiteId;
        newPage._id = parseInt(pages[pages.length - 1]._id) + 1;
        newPage.websiteId = websiteId;
        newPage.update = new Date();
        pages.push(newPage);
        res.json(newPage);
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for (var i in pages) {
            if (pages[i]._id == pageId) {
                pages.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};