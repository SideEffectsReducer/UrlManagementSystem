const mongoose = require('mongoose');

/********************* */
// TO DO:
// - more restrict schema constraints
/********************* */

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    tagName: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    urlLocation: {
        type: String,
        required: true

    },
    active: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    pdfLocation: {
        type: String,
        required: false
    },
    pdfStored: {
        type: Boolean,
        required: true
    },
    urlTracked: {
        type: Boolean,
        required: true
    }
});

let urlModel = mongoose.model('urlModel', urlSchema);

module.exports = urlModel;
