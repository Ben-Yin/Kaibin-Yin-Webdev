(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService() {
        var users = [
            {"_id": 123, "username": "alice", "password": "alice", "firstName": "Alice", "lastName": "Wonder", "email": "alice@neu.edu"},
            {"_id": 234, "username": "bob", "password": "bob", "firstName": "Bob", "lastName": "Marley", "email": "bob@neu.edu"},
            {"_id": 345, "username": "charly", "password": "charly", "firstName": "Charly", "lastName": "Garcia", "email": "charly@neu.edu"},
            {"_id": 456, "username": "jannunzi", "password": "jannunzi", "firstName": "Jose", "lastName": "Annunzi", "email": "jannunzi@neu.edu"}
        ];
        var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function createUser(user) {
            if (findUserByUsername(user.username)){
                return null;
            } else {
                user._id = users[users.length - 1]._id + 1;
                users.push(user);
                return user;
            }
        }

        function findUserById(id) {
            var left = 0;
            var right = users.length;
            while (left <= right) {
                var mid = parseInt((left + right) / 2);
                if (users[mid]._id == id) {
                    return users[mid];
                } else if (users[mid]._id > id) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username) {
                    return users[i];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username && users[i].password == password) {
                    return users[i];
                }
            }
            return null;
        }

        function updateUser(userId, newUser) {
            var user = findUserById(userId);
            if (user) {
                user.firstName = newUser.firstName;
                user.lastName = newUser.lastName;
                user.email = newUser.email;
                return user;
            }
            return null;
        }

        function deleteUser(userId) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == id) {
                    users.splice(i, 1);
                }
            }
        }
    }
})();