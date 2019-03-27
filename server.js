var express = require("express");
var exphbs = require("express-handlebars");
// var logger = require("morgan");
var mongoose = require("mongoose");


var PORT = process.env.PORT || 3000;

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
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


// Start the server
app.listen(PORT, function(){
    console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
});

module.exports = app;