var names = [];
var existingEntries = JSON.parse(localStorage.getItem("marvelizer"));

function displaySearchNames() {
  if (existingEntries !== null) {
    for (let i = 0; i < existingEntries.length; i++) {
      var storedName = existingEntries[i].name;
      // If name not in array
      if (!names.includes(storedName)) {
        names.push(storedName);
      }
    }
    for (let i =  0; i < names.length; i++) {
      let searchLi = $("<li>")
        .addClass("search-name")
        .appendTo(".search-list");
        searchLi.text(names[i]); 
    } 
    } else {
      let noGifMessage = $("<p>")
        .addClass("no-gif-message")
        .appendTo($("#navArea"));
      noGifMessage.text("No Giphys have been chosen as favorites. Use the MARVELizer search page to select favorites.");
    }
}

function displayGifs(clickedName) {
  if ($(".gif-area").length){
    $(".gif-area").empty();
    }  

  for (let i = 0; i < existingEntries.length; i++) {
    if (existingEntries[i].name == clickedName) {
      console.log(existingEntries[i].name);
      var gifUrl = existingEntries[i].url;
      
      let gifColumnDiv = $("<div>")
          .addClass("giphy-div card card-select")
          .appendTo($(".gif-area"));
      $("<img>")
          .addClass("giphys")
          .attr("src", gifUrl)
          .appendTo(gifColumnDiv);
    }
  }
}

displaySearchNames()

// event listener for list item clicks
let listClickEl = $(".search-name");  
listClickEl.on("click", function(event){
  event.preventDefault();
  let clickedName = $(this).text();
  console.log(clickedName + "  <---------");
  displayGifs(clickedName);
  $(".search-name")
      .css("backgroundColor", "white")
      .css("color", "darkgray");
  $(event.target)
    .css("backgroundColor", "red")
    .css("color", "white");
})
