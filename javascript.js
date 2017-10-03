var gifList = ["adam sandler", "jim carrey", "greg davies", "chris farley"];

function renderButtons() {


    $("#buttons-view").empty();

    var len = gifList.length;
    for (var i = 0; i < len; i++) {

        var a = $("<button>");

        a.addClass("gif btn btn-primary");

        a.attr("data-name", gifList[i]);

        a.text(gifList[i]);
        $("#buttons-view").append(a);
    }
}

function ajaxCall(gifClick) {

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifClick + "&api_key=PaFcTgHVMUyoqzbH2TfoZpjVpeHwKWrM&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        var results = response.data;
        console.log(results)
        $("#gifs-appear-here").html("")
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_width.url);
            gifImage.attr("data-state", "animated")
            gifImage.attr("data-still", results[i].images.fixed_width_still.url);
            gifImage.attr("data-animated", results[i].images.fixed_width.url);
            gifDiv.prepend(gifImage);
            gifDiv.prepend(p);

            $("#gifs-appear-here").prepend(gifDiv);
        }

    });
};

$("#add-gif-btn").on("click", function(event) {
    event.preventDefault();

    var gif = $("#gif-input").val().trim();

    gifList.push(gif);

    renderButtons();
});

$(document).on("click", ".gif", function() {
    var gifClick = $(this).attr("data-name")
    ajaxCall(gifClick)
});

$(document).on("click", "img", function() {
    var state = $(this).attr("data-state")
    if (state === "animated") {
        $(this).attr("src", $(this).attr("data-still"))
        $(this).attr("data-state", "still")
    } else {
        $(this).attr("src", $(this).attr("data-animated"))
        $(this).attr("data-state", "animated")
    }
    console.log(this)

})

renderButtons();