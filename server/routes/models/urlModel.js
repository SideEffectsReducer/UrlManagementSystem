const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    title: String,
    tagName: String,
    url: String,
    urlLocation: String,
    active: Boolean,
    type: String,
    pdfLocation: String,
    pdfStored: Boolean,
    urlTracked: Boolean
});

let urlModel = mongoose.model('urlModel', urlSchema);

module.exports = urlModel;
