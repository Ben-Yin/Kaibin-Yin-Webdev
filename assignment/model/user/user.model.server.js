module.exports = function () {
    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser : createUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByCredential:findUserByCredential,
        findUserByUsername: findUserByUsername,
        addWebsiteForUser: addWebsiteForUser,
        deleteWebsiteForUser: deleteWebsiteForUser
    };
    return api;

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function updateUser(userId, user) {
        return UserModel
            .update(
                {
                    _id: userId
                },
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            );
    }

    function deleteUser(userId) {
        return UserModel
            .remove({_id: userId});
    }

    function findUserByCredential(username, password){
        return UserModel
            .findOne(
                {
                    username : username,
                    password : password
                }
            );
    }

    function findUserByUsername(username) {
        return UserModel
            .findOne({username: username});
    }

    function addWebsiteForUser(userId, website) {
        return UserModel
            .findById(userId, function (err, user) {
                user.websites.push(website);
                user.save();
            });
    }

    function deleteWebsiteForUser(userId, websiteId) {
        return UserModel
            .findById(userId, function (err, user) {
                var index = user.websites.indexOf(websiteId);
                user.websites.splice(index, 1);
                user.save();
            });
    }
};