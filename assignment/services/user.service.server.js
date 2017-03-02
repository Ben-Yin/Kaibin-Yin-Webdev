/**
 * Created by BenYin on 2/15/17.
 */
module.exports = function (app) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var users = [
        {"_id": 123, "username": "alice", "password": "alice", "firstName": "Alice", "lastName": "Wonder", "email": "alice@neu.edu"},
        {"_id": 234, "username": "bob", "password": "bob", "firstName": "Bob", "lastName": "Marley", "email": "bob@neu.edu"},
        {"_id": 345, "username": "charly", "password": "charly", "firstName": "Charly", "lastName": "Garcia", "email": "charly@neu.edu"},
        {"_id": 456, "username": "jannunzi", "password": "jannunzi", "firstName": "Jose", "lastName": "Annunzi", "email": "jannunzi@neu.edu"}
    ];


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
        var user = users.find(function (u) {
            return u.username == username;
        });
        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var user = users.find(function (u) {
            return u.password == password && u.username == username;
        });
        res.json(user);
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        var user = users.find(function (u) {
            return u._id == userId;
        });
        res.json(user);
    }
    
    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        for (var i in users) {
            if (users[i]._id == userId) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                users[i].email = newUser.email;
                res.json(users[i]);
            }
        }
    }

    function createUser(req, res) {
        var user = req.body;
        user._id = parseInt(users[users.length - 1]._id) + 1;
        users.push(user);
        res.json(user);
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for (var i in users) {
            if (users[i]._id == userId) {
                users.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};