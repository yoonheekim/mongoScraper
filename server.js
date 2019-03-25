var express = require("express");
// var logger = require("morgan");
var mongoose = require("mongoose");

//scraping tools
var axios = require("axios");
var cheerio = require("cheerio");

//require all models
var db = require("./models");

var PORT = 3000;

//initialize express
var app = express();

//use morgan logger for logging requests
// app.use(logger("dev"));
//parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//make public a static folder
app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Route



// Start the server
app.listen(PORT, function(){
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
})