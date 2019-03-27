$(document).ready(function() {


    $(document).on("click", ".btn.save", saveArticle);
    $(document).on("click", ".btn.delete", deleteArticle);
    $(document).on("click", ".btn.add", add);
    $(document).on("click", ".btn.addComment", addComment);
    $(document).on("click", ".deleteComment", deleteComment);
    
});

function saveArticle(){
    $.ajax({
        method: "PUT",
        url : "/savedArticle/"+ $(this).data("id"),
        data : { saved: true }

    })
    .then(function(dbSavedArticle){
        // console.log(dbSavedArticle)
        location.reload();
    })
};

function deleteArticle(){
    $.ajax({
        method : "DELETE",
        url : "/deleteArticle/"+ $(this).data("id")
    })
    .then(function(dbDeletedArticle){
        // console.log(dbDeletedArticle)
        location.reload();
    })
};

function add(){
    // console.log($("#contentInput").val());

    $.ajax({
        method: "POST",
        url: "/savedArticle/" + $(this).data("id"),
        data: {
            // Value taken from input
            content: $("#contentInput").val()
        }
    })
    .then(function(dbComment){
        console.log("addComment");
        location.reload();
    })
};

function addComment(event){
    event.preventDefault();
    $.ajax({
        method: "GET",
        url: "/savedArticle/" + $(this).data("id")
    })
    .then(function(dbSavedArticle){
        $("#commentSection").empty();
        console.log("dbSavedArticle=================")
        console.log(dbSavedArticle[0].comment)
        if(dbSavedArticle[0].comment.length > 0){
            dbSavedArticle[0].comment.forEach(element => {
                console.log(element.content);
                $("#commentSection").append(`<li class='list-group-item'>${element.content}<button type='button' class='btn btn-danger btn-sm float-right deleteComment' data-id='${element._id}'>X</button></li>`);
            });
        }
        
    });

    $("#commentModal").modal('toggle');

}
function deleteComment(){
    $.ajax({
        method:"DELETE",
        url : "/comment/"+ $(this).data("id")
    })
    .then(function(dbDeletedComment){
        console.log("deleted Comment");
        // location.reload();
    });
    $(this).parent().remove();
}