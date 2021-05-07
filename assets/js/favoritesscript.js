var names = [];
var existingEntries = JSON.parse(localStorage.getItem("Marvelizer"));
var namePositionArray = []
var trigger = true;

function displaySearchNames() {
  if (existingEntries !== null) {
    for (let i = 0; i < existingEntries.characterNames.length; i++) {
      let searchLi = $("<li>")
        .addClass("search-name")
        .attr("id", i)
        .appendTo(".search-list");
      searchLi.text(existingEntries.characterNames[i]);
      namePositionArray.push(existingEntries.characterNames[i]);
    }
  } else {
    let noGifMessage = $("<p>")
      .addClass("no-gif-message")
      .appendTo($("#navArea"));
    noGifMessage.text("No Giphys have been chosen as favorites. Use the MARVELizer search page to select favorites.");
  }
}
//need to find a way too assign each GIF an individual identifier.
//I need each GIF when clicked to change the #embedUrlText value to the URL
function displayGifs(clickedId) {
  trigger = true;
  if ($(".gif-area").length) {
    $(".gif-area").empty();
  }
  for (let i = 0; i < existingEntries.storedGiphys[clickedId].length; i++) {
    let gifColumnDiv = $("<div>")
      .addClass("column gif-div card")
      .appendTo($(".gif-area"));
    $("<img>")
      .addClass("thumbnail")
      .attr("src", existingEntries.storedGiphys[clickedId][i])
      .appendTo(gifColumnDiv);


  }
}

displaySearchNames()

// event listener for list item clicks
let listClickEl = $(".search-name");
listClickEl.on("click", function (event) {
  event.preventDefault();
  let clickedName = $(this).text();
  let clickedId = $(this).attr('id');
  displayGifs(clickedId);
  $(".search-name")
    .css("backgroundColor", "white")
    .css("color", "darkgray");
  $(event.target)
    .css("backgroundColor", "red")
    .css("color", "white");
})

var trigger = true;

// event listiner for GIF image clicks -bb
let gifClickEl = $(".gif-area");


gifClickEl.on("click", (function (event) {
  if (trigger === true) {

    var removeMe = $(".embedUrlText")
    removeMe.empty();
    event.preventDefault();
    // function generateEmbedLink() {

    gifData = JSON.parse(localStorage.getItem("Marvelizer"))
    console.log(gifData)
    // forEach???
    $("<input>")
      .addClass("embedUrlText")
      .val("<img src='" + gifData.storedGiphys[0][1] + "'>")
      .prop('readonly', true)
      .appendTo(".gif-area");
    trigger = false;

    // stringGifData = JSON.stringify(localStorage.getItem("Marvelizer"))
    // console.log(stringGifData)
  }
}))


