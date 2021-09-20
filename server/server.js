const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const api = require('./routes/api');


const port = 3000;
const app = express();

mongoose.connect('mongodb+srv://user_31:zaqwsx@cluster0.xuvw0.mongodb.net/sample_airbnb?retryWrites=true&w=majority', (err) => {
  if (err) {
    // We want to log if app can not connect to database
    console.log(err);
  } else { // If there is no error during db connection, continue proccess
  }
});

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



 // • This is a special method called `middleware`. Every request will be
    // executed on each request. If you want to exclude a specific route to make it
    // not enter on this middleware, simply declare that route before this function
    app.use('/', function (req, res, next) {
      // • Implement your logic here.
      console.log('Time:', Date.now());
      next();
    });

     // • We call use() on the Express application to add the Router to handle path,
    // specifying an URL path on first parameter '/api/example'.
    app.use('/api/example', api);


    // • Every other route that starts with `api/` but not declared above will
    // return `not-found` status. Apply your `not-found` format here.
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
      console.log(req.url);
      res.sendFile(path.join(__dirname, '../dist/UrlManagementSystem/index.html'));
    });

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
})