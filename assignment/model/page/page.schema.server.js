module.exports = function () {
    var mongoose = require('mongoose');
    var PageSchema = mongoose.Schema({
        _website: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'assignment.website'
        },
        name: String,
        title: String,
        description: String,
        widgets: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'assignment.widget'
        }],
        dateCreated: {
            type: Date,
            default: Date.now()
        }
    }, {collection: "assignment.page"});

    return PageSchema;

};