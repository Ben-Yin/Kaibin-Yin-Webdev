/**
 * Created by BenYin on 2/15/17.
 */
module.exports = function (app) {
    app.get("/api/user")
    app.put("")


    function updateUser(req, res) {
        var userId = req.params.userId;
        for (var i in users) {
            if (users[i]._id == userId)
        }
    }
}