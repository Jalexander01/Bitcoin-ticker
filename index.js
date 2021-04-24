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
request("https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD", function(error, response, body){
  console.log("*****************************");
  console.log(body);
});


})


app.listen(3000, function(){
  console.log("Server started on port 3000")
});
