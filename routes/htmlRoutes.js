var axios = require("axios");
var cheerio = require("cheerio");
var express = require('express');

// Require all models
var db = require("../models");

module.exports = function(app) {

  // Load index page
  app.get("/", function(req, res){
    db.Article.find({
      saved: false
    })
    .then(function(dbArticle){
      console.log("dbArticle")
      console.log(dbArticle.length)
      if(dbArticle.length===0){
        res.render("clear");
      } else {
        res.render("index", {dbArticle});
      }
    })
    .catch(function(err){
      console.log(err);
    })
  })

  // Scrape
  app.get("/scrape", function(req, res) {
    axios.get("https://www.nytimes.com/section/us").then(function(response){
      var $ = cheerio.load(response.data);
      var resultArr = [];
      $("#stream-panel .css-1cp3ece").each(function(i, element){
        var result = {};

        result.title = $(element).find("h2").text();
        result.url = $(this).find("a").attr("href");
        result.img = $(this).find("img").attr("src");
        result.summary = $(this).find("p").text();

        
        db.Article.find( { title:  result.title} )
        .then(function(dbArticle){
          if(!dbArticle.length){
            db.Article.create(result)
            .then(function(dbNewArticle){
              // console.log(dbNewArticle)
              // res.json(dbNewArticle);
              res.redirect('/');
            })
            .catch(function(err){
              console.log(err);
              res.json(err);
            })
          }
        })
        .catch(function(err){
          console.log(err);
          res.json(err);
        })
        
        
        

        // resultArr.push(result);
      });
      console.log("-- db scraped")
      
    })
    
  });


  // Clear Article
  app.get("/clear", function(req, res){
    db.Article.remove( {
      saved: false
    } )
    .then(function(dbRemove){
      console.log("-- db cleared");
      res.render("clear");
    })
    .catch(function(err){
      console.log(err);
      res.json(err);
    })
  });

  // Save Article
  app.put("/savedArticle/:id", function(req ,res){
    
    db.Article.update({
      _id: req.params.id
    }, {
      $set : req.body
    })
    .then(function(dbSaved){
      console.log("-- db saved");
      res.json(dbSaved);
    })
    .catch(function(err){
      console.log(err);
      res.json(err);
    })
  });

  // View Saved Articles
  app.get("/savedArticle", function(req, res){
    db.Article.find({
      saved: true
    })
    .then(function(dbSavedrticles){
      console.log("dbSavedrticles=============================")
      console.log(dbSavedrticles.comment)
      res.render("saved", {dbSavedrticles});
    })
    .catch(function(err){
      console.log(err);
      res.json(err);
    })
  });

  app.get("/savedArticle/:id", function(req, res){
    db.Article.find({
      saved: true
    })
    .populate("comment")
    .then(function(dbSavedrticles){
      // console.log(dbSavedrticles);
      res.json(dbSavedrticles);
    })
    .catch(function(err){
      console.log(err);
      res.json(err);
    })
  });

  app.delete("/deleteArticle/:id", function(req, res){
    db.Article.remove({
      _id: req.params.id
    })
    .then(function(dbDeletedArticle){
      res.json(dbDeletedArticle);
      console.log("-- db article deleted")
    })
    .catch(function(err){
      console.log(err);
      res.json(err);
    })
  });

  app.post("/savedArticle/:id", function(req, res){
    db.Comment.create(req.body)
    .then(function(dbComment){
      return db.Article.findOneAndUpdate({
        _id : req.params.id
      }, {
        $push: {comment : dbComment._id}
      },{ 
        new: true 
      })
    })
    .then(function(dbArticle){
      res.json(dbArticle);
    })
    .catch(function(err){
      res.json(err);
    })
  });

  app.delete("/comment/:id", function(req, res){
    db.Comment.remove({
      _id : req.params.id
    })
    .then(function(dbDeletedComment){
      console.log("-- db comment deleted");
      res.json(dbDeletedComment);
    })
    .catch(function(err){
      res.json(err);
    })
  })

}