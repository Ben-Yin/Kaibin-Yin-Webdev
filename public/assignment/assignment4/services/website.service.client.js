(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService() {
        var websites = [
            {"_id": 123, "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": 234, "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": 456, "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": 567, "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": 678, "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": 789, "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];
        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            website._id = websites[websites.length - 1]._id + 1;
            website.developerId = userId;
            websites.push(website);
            return website;
        }

        function findWebsitesByUser(userId) {
            userWebsites = [];
            for (var i = 0; i < websites.length; i++) {
                if (websites[i].developerId == userId) {
                    userWebsites.push(websites[i])
                }
            }
            return userWebsites;
        }

        function findWebsiteById(websiteId) {
            var left = 0;
            var right = websites.length;
            while (left <= right) {
                var mid = parseInt((left + right) / 2);
                if (websites[mid]._id == websiteId) {
                    return websites[mid];
                } else if (websites[mid]._id > websiteId) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id == websiteId) {
                    websites[i].name = website.name;
                    websites[i].description = website.description;
                }
            }
        }

        function deleteWebsite(websiteId) {
            for (var i = 0; i < websites.length; i++) {
                if (websites[i]._id == websiteId) {
                    websites.splice(i, 1);
                }
            }
        }
    }
})();