const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
    res.json(examples); // return all examples in JSON format
  })
})

// • Declaring POST method
router.post('/', function (req, res) {
  // • Create and save `example` on MongoDB.
  // • We get information form request body

  console.log(req.header);
  console.log(req.body);
  console.log("title:", req.body.title);
  urlModel.create({
    title: req.body.title,
    url: req.body.url,
    isActive: req.body.isActive,
    lastUpdated: req.body.lastUpdated,
    pdfPath: req.body.pdfPath
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