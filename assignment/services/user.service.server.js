/**
 * Created by BenYin on 2/15/17.
 */
module.exports = function (app, model) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);


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
                    res.json(user);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(404);
                });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        model
            .UserModel
            .findUserByCredential(username, password)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(404);
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
                    res.sendStatus(404);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        model
            .UserModel
            .updateUser(userId, newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(404);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        model
            .UserModel
            .createUser(user)
            .then(
                function (newUser) {
                    res.json(newUser);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(404);
                }
            )
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        model
            .UserModel
            .deleteUser(userId)
            .then(
                function (user) {
                    res.sendStatus(200);
                },
                function (err) {
                    console.log(err);
                    res.sendStatus(404);
                }
            )
    }
};