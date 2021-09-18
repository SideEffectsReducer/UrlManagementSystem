const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
    title: String,
    url: String,
    isActive: String, 
    lastUpdate: String,
    pdfPath: String
});

let urlModel = mongoose.model('urlModel', urlSchema);

module.exports = urlModel;
