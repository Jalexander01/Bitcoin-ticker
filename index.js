const express = require("express");
const bodyParser = require("body-parser");
const request = require ("request");
const app = express();

//bitcoinaverage
const ba = require('bitcoinaverage');

var publicKey = 'YzA4NmFkNWM5ODUyNGMwZWE1Njc3OTNhY2M3Mjg2ZDQ';
var secretKey = 'YTBmOGQ2MjQ2YzBmNDUwYjk0MWE2ZTdhNDI2NjkwYzAxN2Q1YWZhMjc1MTc0NjljOTc5N2M0MzA2NjU4NWFmYw';

var restClient = ba.restfulClient(publicKey, secretKey);
var wsClient = ba.websocketClient(publicKey, secretKey);

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  // console.log(req);
  // res.sendFile();
  res.sendFile(__dirname + "/index.html");
  // res.send(__dirname);

})


app.post("/", function(req, res){

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
// console.log(req.body.crypto);
// console.log(req.body.fiat);

var symbol_set = 'global';
var symbol = 'BTCUSD';

restClient.getTickerDataPerSymbol('global', 'BTCUSD', function(response) {

   var data = JSON.parse(response);
   var price = data.last;
    console.log(price);


}, function(error){
    console.log(error);
}) ;

// var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
// finalURL = baseURL + crypto + fiat;
// request ( finalURL, function(error, response, body){
//   console.log("*****************************");
//

//   // console.log(body);
//
//   // var data = JSON.parse(body);
//      // var price = response.last;
//   // var dailyAverage = data.averages.day;
//   // var weeklyAverage = data.averages.week;
//   //
//   // console.log("price " + price);
//   // console.log("*****************************");
//   // console.log("Daily average " + dailyAverage);
//   // console.log("*****************************");
//   // console.log("Weekly average " + weeklyAverage);
//   //
//   // currentDate = data.display_timestamp;
//   // res.write("<h1>The current time is " +currentDate +"</h1>");
//   // res.write("<h1>The current Bitcoin Price is " + price + "</h1>");
//   // res.send();
// });


})


app.listen(3000, function(){
  console.log("Server started on port 3000")
});
