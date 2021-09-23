const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var cors = require('cors');

const urlModel = require('./models/urlModel');


// • Declaring GET method
router.get('/list', function (req, res) {
  console.log("get");
  // • Use mongoose to get all `examples` in our database
  // • How we got this find() method you'll ask? Well, that comes from our
  // declared mongoose model.
  urlModel.find(function (err, examples) {
    // • If there is an error, send the error. nothing after res.send(err)
    // will execute
    if (err) { res.send(err); }

    // • Return all `examples` in JSON format
    res.json(JSON.stringify(examples)); // return all examples in JSON format
  })
})

// • Declaring POST method
router.post('/add', cors(), function (req, res) {
  // • Create and save `example` on MongoDB.
  // • We get information form request body

  console.log(req.header);
  console.log(req.body);
  console.log("title:", req.body.title);
  urlModel.create({
    title: req.body.title,
    tagName: req.body.tagName,
    url: req.body.url,
    urlLocation: req.body.urlLocation,
    active: req.body.active,
    type: req.body.active,
    pdfLocation: req.body.pdfLocation,
    pdfStored: req.body.pdfStored,
    urlTracked: req.body.urlTracked
  }, function (err, examples) {
    if (err) { res.send(err); }

    // • Get and return all the `examples` after you create another
    urlModel.find(function (err, examples) {
      if (err) { res.send(err); }
      res.json(examples);
    })
  })
})


module.exports = router;