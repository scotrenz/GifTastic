var gifList = ["adam sandler", "jim carrey", "greg davies", "chris farley"];

function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    var len = gifList.length;
    for (var i = 0; i < len; i++) {

        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class
        a.addClass("gif btn btn-primary");
        // Added a data-attribute
        a.attr("data-name", gifList[i]);
        // Provided the initial button text
        a.text(gifList[i]);
        // Added the button to the HTML
        $("#buttons-view").append(a);
    }
}

function ajaxCall(gifClick) {

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gifClick + "&api_key=PaFcTgHVMUyoqzbH2TfoZpjVpeHwKWrM&limit=10";

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

    // This line grabs the input from the textbox
    var gif = $("#gif-input").val().trim();

    // The movie from the textbox is then added to our array
    gifList.push(gif);

    // Calling renderButtons which handles the processing of our movie array
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

// Calling the renderButtons function to display the intial buttons
renderButtons();