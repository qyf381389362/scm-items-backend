let mongoose = require('mongoose');

let scmItemSchema = mongoose.Schema({
    key: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const ScmItem = module.exports = mongoose.model('ScmItem', scmItemSchema);