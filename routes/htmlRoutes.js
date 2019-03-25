var axios = require("axios");
var cheerio = require("cheerio");


// Require all models
var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    axios.get("https://www.nytimes.com/").then(function(response){
      var $ = cheerio.load(response.data);
      var resultArr = [];
      $("article").each(function(i, element){
        var result = {};

        result.title = $(element).find("h2").text();
        result.summary = $(this).find("p").text();
        result.url = $(this).find("a").attr("href");
        result.img = $(this).find("img").attr("src");

        
        resultArr.push(result);
      });
      res.render("index", {resultArr});
      console.log("result================================");
      console.log(resultArr);
    })
    
  });

}