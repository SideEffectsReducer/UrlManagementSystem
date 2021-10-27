const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    title: {
            type: String,
             required: [true, 'UrlModel reqire title propery and it is required to be string?']
    },
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
