var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    title : String,
    summary : String,
    url : String,
    img : String,
    saved : {
        type: Boolean,
        default: false
    },
    comment: [
        {
            type : Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]

});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;