const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentSchema = new Schema({
    title: {type: String, required: true},
    post: {type: String},
    img: {type: String},
}, {timestamps: true});

const Content = mongoose.model('Content', contentSchema)

module.exports = Content