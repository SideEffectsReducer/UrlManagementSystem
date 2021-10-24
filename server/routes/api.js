const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var mongodb = require('mongodb');
var cors = require('cors');
const {createPdf} = require('../pdf_processing');

const urlModel = require('./models/urlModel');
const https = require('https');


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
  });
});

// • Declaring GET method
router.get('/one/:recordNumber', function (req, res) {
  console.log("get");
  // • Use mongoose to get all `examples` in our database
  // • How we got this find() method you'll ask? Well, that comes from our
  // declared mongoose model.
  urlModel.find(function (err, examples) {
    // • If there is an error, send the error. nothing after res.send(err)
    // will execute
    if (err) { res.send(err); }

    // • Return all `examples` in JSON format
    res.json(JSON.stringify(examples[req.params.recordNumber])); // return all examples in JSON format
  });
});


// • Declaring POST method
router.delete('/delete', cors(), function (req, res) {
  console.log(req.body);
 let id  =  req.body.id;
 console.log("Express is deleting id: ", id);

  urlModel.find(function (err, examples) {
    // • If there is an error, send the error. nothing after res.send(err)
    // will execute
    if (err) { res.send(err); }

    // • Return all `examples` in JSON format
    let data = JSON.stringify(examples); // return all examples in JSON format
    let uniqueId = JSON.parse(data)[id]._id;

    console.log("uniqueId: ", uniqueId);
    urlModel.remove({ _id: uniqueId}, function(err) {
    if (!err) {
            console.log('sucess');
    }
    else {
            console.log('error');
    }
  });

  });
 res.sendStatus(200);

});

// • Declaring POST method
router.post('/edit/:id', cors(), function (req, res) {
  console.log("post edit");
  const locationPath = "./generated";
  const record = {
    title: req.body.title,
    tagName: req.body.tagName,
    url: req.body.url,
    urlLocation: req.body.urlLocation,
    active: req.body.active,
    type: req.body.type,
    pdfLocation: locationPath + "/" + req.body.title + ".pdf",
    pdfStored: req.body.pdfStored,
    urlTracked: req.body.urlTracked
  }

  urlModel.updateOne({_id: req.params.id}, record,function(err, res) {
  if(err){
    console.log(err);
  }
  });
  res.sendStatus(200);
});


// • Declaring POST method
router.post('/add', cors(), function (req, res) {
  // • Create and save `example` on MongoDB.
  // • We get information form request body
  console.log("post");
  const locationPath = "./generated";
  urlModel.create({
    title: req.body.title,
    tagName: req.body.tagName,
    url: req.body.url,
    urlLocation: req.body.urlLocation,
    active: req.body.active,
    type: req.body.type,
    pdfLocation: locationPath,
    pdfStored: req.body.pdfStored,
    urlTracked: req.body.urlTracked
  }, function (err, examples) {
    if (err) { res.send(err); }

    // • Get and return all the `examples` after you create another
    urlModel.find(function (err, examples) {
      if (err) { res.send(err); }
      const createdUrlRecord = examples[examples.length - 1];
      if(createdUrlRecord.pdfStored){
        createPdf(req.body.url, createdUrlRecord._id, locationPath);
      }
      if(createdUrlRecord.urlTracked){
        createdUrlRecord.active = false;
        https.get(createdUrlRecord.url, (resp) => {
          if(200 == resp.statusCode){
          createdUrlRecord.active = true;
            urlModel.updateOne({_id: createdUrlRecord._id}, {active: true},function(err, res) {
            if(err){
              console.log(err);
            }
            });
          }
        console.log(createdUrlRecord);
        });

      }
      res.status(201).json(createdUrlRecord);
    });
  });
});

module.exports = router;