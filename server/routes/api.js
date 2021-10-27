const express = require('express');
const router = express.Router();
const { createPdf } = require('../pdf_processing');
const urlModel = require('./models/urlModel');
const https = require('https');


router.get('/list', function (req, res) {
  urlModel.find(function (err, urlRecordsList) {
    if (err) { res.status(406).send(err); }
    res.json(JSON.stringify(urlRecordsList));
  });
});

router.get('/one/:recordNumber', function (req, res) {
  urlModel.find(function (err, examples) {
    if (err) { res.status(406).send(err); }
    res.json(JSON.stringify(examples[req.params.recordNumber]));
  });
});


router.delete('/delete', function (req, res) {
  let id  =  req.body.id;
  urlModel.find(function (err, examples) {
    if (err) { res.status(406).send(err); }
    let uniqueId = examples[id]._id;
    urlModel.remove({ _id: uniqueId}, function(err) {
      if (err) { res.status(406).send(err); }
    });
  });
 res.sendStatus(202);
});

router.post('/edit/:id', async function (req, res) {
  const recievedRecord = new urlModel(req.body);
  let validationErr = recievedRecord.validateSync();
  if(validationErr !== undefined) {res.status(406).send(validationErr); }
  const modifiedRecord = {
    title: recievedRecord.title,
    tagName: recievedRecord.tagName,
    url: recievedRecord.url,
    urlLocation: recievedRecord.urlLocation,
    active: recievedRecord.active,
    type: recievedRecord.type,
    pdfLocation: recievedRecord.pdfLocation,
    pdfStored: recievedRecord.pdfStored,
    urlTracked: recievedRecord.urlTracked
  };
  const respMongoDb = await urlModel.updateOne({_id: req.params.id}, modifiedRecord);
  if (!respMongoDb.acknowledged && err !== undefined) { res.status(406).send('Mongodb response not acknoweldged'); }
  res.sendStatus(201);
});


router.post('/add', async function (req, res) {
  const locationPath = "./generated";
  const recievedRecord = new urlModel(req.body);
  const validationErr = recievedRecord.validateSync();
  if(validationErr !== undefined) {res.status(406).send(validationErr); }

  const createdUrlRecord = await urlModel.create({
    title: recievedRecord.title,
    tagName: recievedRecord.tagName,
    url: recievedRecord.url,
    urlLocation: recievedRecord.urlLocation,
    active: recievedRecord.active,
    type: recievedRecord.type,
    pdfLocation: locationPath,
    pdfStored: recievedRecord.pdfStored,
    urlTracked: recievedRecord.urlTracked
    });

    if(createdUrlRecord.pdfStored){
      createPdf(recievedRecord.url, createdUrlRecord._id, locationPath);
    }
    if(createdUrlRecord.urlTracked){
      updateUrlStatus(createdUrlRecord);
    }
    res.status(201).json(createdUrlRecord);
});

function updateUrlStatus(createdUrlRecord){
  // TO DO: refactoring
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

module.exports = router;