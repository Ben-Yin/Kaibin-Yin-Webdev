(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "567", "title": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "567", "title": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "567", "title": "Lorem"}
        ];
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };

        return api;

        function createPage(websiteId, page) {
            page._id = pages[pages.length - 1]._id + 1;
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPageByWebsiteId(websiteId) {
            var websitePages = [];
            for (var i = 0; i < pages.length; i++) {
                if (pages[i].websiteId == websiteId) {
                    websitePages.push(pages[i]);
                }
            }
            return websitePages;
        }

        function findPageById(pageId) {
            var left = 0;
            var right = pages.length;
            while (left <= right) {
                var mid = parseInt((left + right) / 2);
                if (pages[mid]._id == pageId) {
                    return pages[mid];
                } else if (pages[mid]._id > pageId) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id == pageId) {
                    pages[i].name = page.name;
                    pages[i].title = page.title;
                }
            }
        }

        function deletePage(pageId) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i]._id == pageId) {
                    pages.splice(i, 1);
                }
            }
        }
    }
})();