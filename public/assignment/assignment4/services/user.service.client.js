(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService($http) {
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
                return angular.copy(user);
            }
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByUsername(username) {
            for (var i in users) {
                if (users[i].username == username) {
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?name="+username);
        }

        function updateUser(userId, newUser) {
            $http.put("/api/user/"+userId);
        }

        function deleteUser(userId) {
            for (var i in users) {
                if (users[i]._id == id) {
                    users.splice(i, 1);
                }
            }
        }
    }
})();
