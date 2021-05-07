var names = [];
var existingEntries = JSON.parse(localStorage.getItem("Marvelizer"));
var namePositionArray = []

function displaySearchNames() {
  if (existingEntries !== null) {
    for (let i =  0; i < existingEntries.characterNames.length; i++) {
      let searchLi = $("<li>")
        .addClass("search-name")
        .attr("text-transform", "capitalize")
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
        let gifColumnDiv = $("<div>")
          .addClass("giphy-div giphy-divFav card card-select")
          .appendTo($(".gif-area"));
            $("<img>")
          .addClass("giphysfav")
          .attr("src", existingEntries.storedGiphys[clickedId][i])
          .appendTo(gifColumnDiv);

  }
}

function addListeneronGiphys() {
$(".giphysfav").on("click", function(e){
e.preventDefault();
let copyLink = $(this).attr("src")
    const el = document.createElement('textarea');
    el.value = copyLink;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
 
})
}

displaySearchNames()

// event listener for list item clicks
let listClickEl = $(".search-name");  
listClickEl.on("click", function(event){
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
    addListeneronGiphys()
})
