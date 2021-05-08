var names = [];
var existingEntries = JSON.parse(localStorage.getItem("Marvelizer"));
var namePositionArray = []

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


let gifClickEl = $(".gif-area");
gifClickEl.on("click", (function (event) {
  $("#copyUrlButton").css("pointer-events","all")
  $("#copyUrlButton").val("Copy embedded URL")
  $("#embeded-link").fadeIn(2000)
  document.getElementById("URLinput").style.display = "initial";
  document.getElementById("copyUrlButton").style.display = "initial";
  $("#URLinput")
    .val("<img src='" + event.target.src + "'>");
}))

let copyUrlButton = $("#copyUrlButton")
copyUrlButton.on("click", (function copyToClipboard() {
  var gifURL = document.getElementById("URLinput");
  gifURL.select();
  gifURL.setSelectionRange(0, 99999);
  document.execCommand("copy");


  $("#copyUrlButton").val("Link Copied!")
$("#URLinput").hide()


}))




