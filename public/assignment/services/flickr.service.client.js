/**
 * Created by BenYin on 3/7/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);
    
    function FlickrService($http) {
        var api = {
            "getSearchUrl" : getSearchUrl,
            "searchPhotos" : searchPhotos
        };

        return api;

        function getSearchUrl(searchTerm) {
            return $http.get("/api/search-flickr?searchTerm="+searchTerm);
        }

        function searchPhotos(url) {
            return $http.get(url);
        }
    }
})();