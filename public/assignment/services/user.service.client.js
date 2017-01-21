(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
        var api = {
            "createUser"   : "createUser",
            "findUserById" : "findUserById",
            "findUserByUsername" : "findUserByUsername",
            "findUserByCredentials" : "findUserByCredentials",
            "updateUser" : "updateUser",
            "deleteUser" : "deleteUser"
        };
        return api;
        function createUser(user) {
            user._id = users[users.length-1]._id+1;
            users.push(user);
        }
        function findUserById(id) {
            left = 0;
            right = users.length;
            while (left < right) {
                mid = (left + right) / 2;
                if (users[mid]._id == id) {
                    return users[mid];
                } else if (users[mid] > id) {
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
        function updateUser(userId, user) {
            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == id) {
                    users[i] = user;
                }
            }
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
