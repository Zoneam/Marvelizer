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

  if ($(".gif-area").length){
      $(".gif-area").empty();
      }  

    for (let i = 0; i < existingEntries.storedGiphys[clickedId].length; i++) {
        let giphyLine = $("<div>")
          .addClass("my-giphy-line")
          .appendTo($(".gif-area"));
      let gifColumnDiv = $("<div>")
          .addClass("giphy-div giphy-divFav card card-select")
          .appendTo(giphyLine);
          $("<img>")
          .addClass("giphysfav")
          .attr("src", existingEntries.storedGiphys[clickedId][i])
          .appendTo(gifColumnDiv);
  }
}

$(".copy-button").on("click", function(){
  if($(".copy-button").text() == "Switch to Copy Embedding Link" ){
  $("#message-how-to").text("Click on the image to copy embedding link")
  $(".copy-button").text("Switch to Copy Direct Link")
  } else if($(".copy-button").text() == "Switch to Copy Direct Link"){
    $("#message-how-to").text("Click on the image to copy direct link")
  $(".copy-button").text("Switch to Copy Embedding Link")
=======
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
})


function addListeneronGiphys() {

$(".giphy-div").on("click", function(e){
e.preventDefault();
$(".giphyLabel").show();
let copyLink
if ($("#message-how-to").text() == "Click on the image to copy direct link"){
    copyLink = $(this).children("img").attr("src")
    const el = document.createElement('textarea');
    el.value = copyLink;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    $(".giphyLabel").text("Direcd Link has Been Copied to Clipboard").fadeOut(3000);
} else if ($("#message-how-to").text() == "Click on the image to copy embedding link"){
  copyLink = '<img src="' + $(this).children("img").attr('src') + '" width=”125″ height=”12″ />';
  const el = document.createElement('textarea');
    el.value = copyLink;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    $(".giphyLabel").text("Embedding Link has Been Copied to Clipboard").fadeOut(3000);
}

})

}
displaySearchNames()

let listClickEl = $(".search-name");
listClickEl.on("click", function (event) {
  event.preventDefault();
  // let clickedName = $(this).text();
  let clickedId = $(this).attr('id');
  displayGifs(clickedId);
  $(this).attr("backgroundColor","red")
  $(".search-name")

      .attr("backgroundColor", "white")
      .attr("color", "darkgray");
  $(event.target)
    .attr("backgroundColor", "red")
    .attr("color", "white");
    addListeneronGiphys()
})

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


