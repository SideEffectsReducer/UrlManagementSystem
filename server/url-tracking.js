const https = require('https');
const http = require('http');
const urlModel = require('./routes/models/urlModel');

/********************* */
// TO DO:
// - checkUrlsStatusPeriodically positve/negative testing
// - checkUrlsStatusPeriodically function code refactoring
/********************* */


function checkUrlsStatusPeriodically(listOfUrls) {
    console.log("start checkUrlsStatusPeriodically function");
    for (let urlRecord of listOfUrls) {
        console.log(urlRecord);
        if (urlRecord.urlTracked == true) {
            urlRecord.active = false;
        try{
            console.log('send http request');
            https.get(urlRecord.url, (resp) => {
                console.log(urlRecord._id);
                if (200 == resp.statusCode) {
                    urlRecord.active = true;
                }
                    urlModel.updateOne({ _id: urlRecord._id }, { active: urlRecord.active }, function (err, res) {
                        if (err) {
                            console.log(err);
                        }
                    });
                console.log(urlRecord);
            }).on("error",  e=>{console.log(e);});
        }
        catch(error){
            urlModel.updateOne({ _id: urlRecord._id }, { active: urlRecord.active }, function (err, res) {
            if (err) {
                console.log(err);
                }
            });
            console.log(error);
        }
        }
    }
}

module.exports = {checkUrlsStatusPeriodically};
