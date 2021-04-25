const express = require("express");
const bodyParser = require("body-parser");
const request = require ("request");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  // console.log(req);
  // res.sendFile();
  res.sendFile(__dirname + "/index.html");
  // res.send(__dirname);

})


app.post("/", function(req, res){

// console.log(req.body.crypto);
// console.log(req.body.fiat);
var crypto = req.body.crypto;
var fiat = req.body.fiat;
var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
finalURL = baseURL + crypto + fiat;
request (finalURL, function(error, response, body){
  console.log("*****************************");
  // console.log(body);

  var data = JSON.parse(body);
  var price = data.last;
  var dailyAverage = data.averages.day;
  var weeklyAverage = data.averages.week;

  console.log("price " + price);
  console.log("*****************************");
  console.log("Daily average " + dailyAverage);
  console.log("*****************************");
  console.log("Weekly average " + weeklyAverage);

  currentDate = data.display_timestamp;
  res.write("The current time is " +currentDate );
  res.write("<h1>The current Bitcoin Price is " + price + "</h1>");
  res.send();
});


})


app.listen(3000, function(){
  console.log("Server started on port 3000")
});
