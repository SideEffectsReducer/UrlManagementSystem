const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://user_31:leverage@cluster0.xuvw0.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log(err);
    if(!err) {
    console.log("We are connected");
  }
  const collection = client.db("sample_airbnb").collection("listingsAndReviews");
  collection.findOne({}).then(value =>{
    console.log("then");
    console.log(value);
  client.close();
  }).catch(reason => {
    console.log("catch");
    console.log(reason);
  client.close();
  });

  // perform actions on the collection object
});