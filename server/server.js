const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const api = require('./routes/api');
const cors = require('cors');
const {checkUrlsStatusPeriodically} = require('./url-tracking');
const http = require('http');


const port = 3000;
const app = express();

/* test db */ 
// mongoose.connect('mongodb+srv://user_31:zaqwsx@cluster0.xuvw0.mongodb.net/test_database?retryWrites=true&w=majority', (err) => {
/* production db */ 
mongoose.connect('mongodb+srv://user_31:zaqwsx@cluster0.xuvw0.mongodb.net/sample_airbnb?retryWrites=true&w=majority', (err) => {
  if (err) { console.log(err);}
});

app.use('/generated', express.static(path.join(__dirname, 'generated')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/', function (req, res, next) {
  console.log('Time:', new Date().toString());
  next();
});

app.use('/api/urlMgr', api);

app.get('/api/*', (req, res) => {
  res.send({
        message: 'Endpoint not found',
        type: 'error'
      });
});

// • Every other route not declared above will redirect us to Angular view
// called `index.html`. Be sure you have builded and created output files from
// angular app.
app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/UrlManagementSystem/index.html'));
});

let server = app.listen(port, function(){
    console.log("UrlManagement Server running on localhost:" + port);
});

function close(){
  server.close();
  mongoose.connection.close();
}

const minutesInterval =1;
const delayMs = minutesInterval * 60 * 1000;

setInterval(() =>{
  // TO DO: refactoring
    let callback = function(response) {
    let str = '';
    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end', function () {
        const listOfUrls = JSON.parse(JSON.parse(str));
        checkUrlsStatusPeriodically(listOfUrls);
    });
  }
  http.get('http://localhost:3000/api/urlMgr/list', callback);
}, delayMs);

module.exports = {app, close};