/**
 * Created by BenYin on 3/7/17.
 */
module.exports = function (app, model) {
    app.get("/api/search-flickr", searchPhotos);
    // app.put("/api/widget/:widgetId/select-flickr", selectPhotos);

    function searchPhotos(req, res) {
        var searchTerm = req.query.searchTerm;
        var key = process.env.FLICKR_API_KEY;
        var secret = process.env.FLICKR_API_SECRET;
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";
        var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
        res.send(url);

    }

};
