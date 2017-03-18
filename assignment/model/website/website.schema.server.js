module.exports = function () {
    var mongoose = require("mongoose");
    var WebsiteSchema = mongoose.Schema({
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'assignment.user'
        },
        name: {
            type: String,
            required: true
        },
        description: String,
        pages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'assignment.page'
        }],
        dateCreated: {
            type: Date,
            default: Date.now()
        }
    }, {collection: "assignment.website"});

    return WebsiteSchema;
};