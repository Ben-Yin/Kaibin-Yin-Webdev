/**
 * Created by BenYin on 2/15/17.
 */
module.exports = function (app, model) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var md5 = require('md5');

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        } else {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        model
            .UserModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if (user) {
                        res.json(user);
                    } else {
                        res.sendStatus(500);
                    }
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = md5(req.query.password);
        model
            .UserModel
            .findUserByCredential(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(500).send(err);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        model
            .UserModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(500).send(err);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        console.log(newUser);
        model
            .UserModel
            .updateUser(userId, newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        user.password = md5(user.password);
        model
            .UserModel
            .createUser(user)
            .then(
                function (newUser) {
                    res.json(newUser);
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        model
            .UserModel
            .findUserById(userId)
            .then(
                function (user) {
                    var promises = [];
                    for (var i= 0; i < user.websites.length; i++) {
                        var promise = model
                            .WebsiteModel
                            .deleteWebsite(user.websites[i]);
                        promises.push(promise);
                    }
                    promises.push(user.remove());
                    return model.Promise.all(promises);
                }
            )
            .then(function (status) {
                res.sendStatus(200);
            }, function (err) {
                console.log(err);
                res.sendStatus(500).send(err);
            })
    }
};